import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders only the title and author by default', () => {
  const blog = {
    title: 'test title',
    author: 'Test McTest',
    url: 'www.test.com',
    likes: 1,
  }

  render(<Blog blog={blog} updateBlog={jest.fn()} removeBlog={jest.fn()}/>)
  expect(screen.getByText(/test title/)).toBeInTheDocument()
  expect(screen.queryByText(/www.test.com/)).not.toBeInTheDocument()
})

test('renders url and likes after the view-button is pressed', async () => {
  const blog = {
    title: 'test title',
    author: 'Test McTest',
    url: 'www.test.com',
    likes: 1,
    user: {
      id: 1,
      username: 'test'
    }
  }

  const loggedUser = {
    username: 'test',
    name: 'Testman'
  }

  render(<Blog blog={blog} updateBlog={jest.fn()} removeBlog={jest.fn()} loggedUser={loggedUser}/>)
  expect(screen.getByText(/test title/)).toBeInTheDocument()
  expect(screen.queryByText(/www.test.com/)).not.toBeInTheDocument()
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  expect(screen.getByText(/www.test.com/)).toBeInTheDocument()
  expect(screen.getByText(/likes 1/)).toBeInTheDocument()
})

test('like button works correctly', async () => {
  const blog = {
    title: 'test title',
    author: 'Test McTest',
    url: 'www.test.com',
    likes: 1,
    user: {
      id: 1,
      username: 'test'
    }
  }

  const loggedUser = {
    username: 'test',
    name: 'Testman'
  }

  const likeMock = jest.fn()

  render(<Blog blog={blog} updateBlog={likeMock} removeBlog={jest.fn()} loggedUser={loggedUser}/>)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(likeMock.mock.calls).toHaveLength(2)
})