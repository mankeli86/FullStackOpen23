import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    createBlog(newBlog)
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      title:<input id='title' value={blogTitle} onChange={event => setBlogTitle(event.target.value)}/>
      <br/>
      author:<input id='author' value={blogAuthor} onChange={event => setBlogAuthor(event.target.value)}/>
      <br/>
      url:<input id='url' value={blogUrl} onChange={event => setBlogUrl(event.target.value)}/>
      <br/>
      <button id='create-button' type='submit'>create</button>
    </form>
  )
}

export default BlogForm