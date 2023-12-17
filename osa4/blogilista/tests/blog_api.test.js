const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
]

test('correct amount of blogs is returned', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(2)
})

test('id field is defined in every blog', async () => {
  const res = await api.get('/api/blogs')

  res.body.forEach(blog => {
    expect(blog.id).toBeDefined()  
  })
})

test('new blog can be added', async () => {
  const newBlog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(3)
})

test('adding a new blog without likes field sets likes to zero', async () => {
  const newBlog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  expect(res.body.map(blog => blog.likes)).toContain(0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    _id: "5a422bc61b54a676234d17fc",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsInDb = await Blog.find({})
  const blogToDelete = blogsInDb.map(blog => blog.toJSON())[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(initialBlogs.length - 1)
})

test('deleting blog with non-existing id returns 400', async () => {
  await api
    .delete('/api/blogs/nonexisting')
    .expect(400)
})

test('a blog can be updated', async () => {
  const blogsInDb = await Blog.find({})
  const blogToUpdate = blogsInDb.map(blog => blog.toJSON())[0]
  const updated = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 10
  }
  
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updated)

  const updatedBlogs = await api.get('/api/blogs')
  expect(updatedBlogs.body[0].likes).toBe(10)
})

test('user creation fails when username is not unique or is too short', async () => {
  const usersInDbStart = await Blog.find({})

  const newUser1 = {
    username: 'root',
    name: 'su',
    password: '1234'
  }

  const result1 = await api
    .post('/api/users')
    .send(newUser1)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result1.body.error).toContain('expected `username` to be unique')

  const newUser2 = {
    username: 'r',
    name: 'su',
    password: '1234'
  }

  const result2 = await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result2.body.error).toContain('is shorter than the minimum allowed length')

  const usersInDbEnd = await Blog.find({})
  expect(usersInDbEnd).toHaveLength(usersInDbStart.length)
})

test('user creation fails when username does not exist', async () => {
  const usersInDbStart = await Blog.find({})

  const newUser = {
    name: 'su',
    password: '1234'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('`username` is required')

  const usersInDbEnd = await Blog.find({})
  expect(usersInDbEnd).toHaveLength(usersInDbStart.length)
})

test('user creation fails when password is too short or does not exist', async () => {
  const usersInDbStart = await Blog.find({})

  const newUser1 = {
    username: 'root2',
    name: 'su',
    password: '1'
  }

  const result1 = await api
    .post('/api/users')
    .send(newUser1)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result1.body.error).toContain('password must be atleast 3 characters')

  const newUser2 = {
    username: 'root2',
    name: 'su'
  }

  const result2 = await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result2.body.error).toContain('password must be atleast 3 characters')

  const usersInDbEnd = await Blog.find({})
  expect(usersInDbEnd).toHaveLength(usersInDbStart.length)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  let userObject = new User({ username: 'root', name: 'su', password: '123'})
  await userObject.save()
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

afterAll(async () => {
  await mongoose.connection.close()
})