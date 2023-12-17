const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('correct amount of blogs is returned', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(6)
})

test('id field is defined in every blog', async () => {
  const res = await api.get('/api/blogs')

  res.body.forEach(blog => {
    expect(blog.id).toBeDefined()  
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})