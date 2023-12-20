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
      title:<input value={blogTitle} onChange={event => setBlogTitle(event.target.value)}/>
      <br/>
      author:<input value={blogAuthor} onChange={event => setBlogAuthor(event.target.value)}/>
      <br/>
      url:<input value={blogUrl} onChange={event => setBlogUrl(event.target.value)}/>
      <br/>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm