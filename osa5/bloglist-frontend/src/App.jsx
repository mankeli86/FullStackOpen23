import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleBlogTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setNotificationMsg(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setNotificationType('add')
      setTimeout(() => {
        setNotificationMsg(null)
        setNotificationType(null)
      }, 4000)
    } catch (e) {
      setNotificationMsg('adding new blog failed')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMsg(null)
        setNotificationType(null)
      }, 4000)
    }
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setNotificationMsg('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMsg(null)
        setNotificationType(null)
      }, 4000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        title:<input value={blogTitle} onChange={handleBlogTitleChange}/>
        <br/>
        author:<input value={blogAuthor} onChange={handleBlogAuthorChange}/>
        <br/>
        url:<input value={blogUrl} onChange={handleBlogUrlChange}/>
        <button type='submit'>create</button>
      </form>
    )
  }
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMsg} type={notificationType}/>
        <form onSubmit={handleLogin}>
          username<input value={username} onChange={handleUsernameChange}/>
          <br/>
          password<input type='password' value={password} onChange={handlePasswordChange}/>
          <br/>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMsg} type={notificationType}/>
      <div>{user.name} logged in<button onClick={(e) => handleLogout(e)}>logout</button></div>
      <br/>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App