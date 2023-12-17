const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

afterAll(async () => {
  await mongoose.connection.close()
})