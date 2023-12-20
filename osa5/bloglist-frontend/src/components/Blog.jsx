import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, loggedUser }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }

  const addLike = () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.id
    }
    updateBlog(updatedBlog)
  }

  const remove = () => {
    const deleting = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (deleting) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {showAll ? (
        <div>
          {blog.title} {blog.author}
          <button id='hide-button' onClick={toggleVisibility}>hide</button>
          <br/>
          {blog.url}
          <br/>
          likes {blog.likes}
          <button id='like-button' onClick={addLike}>like</button>
          <br/>
          {blog.user.name}
          <br/>
          {loggedUser.username === blog.user.username ? (
            <button id='remove-button' onClick={remove}>remove</button>
          ) : null}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <button id='view-button' onClick={toggleVisibility}>view</button>
        </div>
      )}
    </div>
  )}

export default Blog