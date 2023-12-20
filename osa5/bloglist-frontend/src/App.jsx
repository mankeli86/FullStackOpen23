import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [updateBlogs, setUpdateBlogs] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    })
  }, [updateBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addBlog = async (blogObject) => {

    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setUpdateBlogs(!updateBlogs)
      setNotificationMsg(`a new blog ${response.title} by ${response.author} added`)
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

  const updateBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject.id, blogObject)
      setUpdateBlogs(!updateBlogs)
    } catch (e) {
      setNotificationMsg('updating blog failed')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMsg(null)
        setNotificationType(null)
      }, 4000)
    }
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      setUpdateBlogs(!updateBlogs)
    } catch (e) {
      setNotificationMsg('removing blog failed')
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
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
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
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} loggedUser={user} />
      )}
    </div>
  )
}

export default App