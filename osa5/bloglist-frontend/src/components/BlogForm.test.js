import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('blog is created with correct info', async () => {
  const createMock = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createMock}/>)
  const inputs = screen.getAllByRole('textbox')

  await user.type(inputs[0], 'test title')
  await user.type(inputs[1], 'test author')
  await user.type(inputs[2], 'test url')

  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(createMock.mock.calls).toHaveLength(1)
  expect(createMock.mock.calls[0][0].title).toBe('test title')
  expect(createMock.mock.calls[0][0].author).toBe('test author')
  expect(createMock.mock.calls[0][0].url).toBe('test url')
})