const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (Array.isArray(blogs) && blogs.length) {
    return blogs.map(blog => blog.likes).reduce((acc, amnt) => acc + amnt)
  } else {
    return 0
  }
}

const favoriteBlog = (blogs) => {
  if (Array.isArray(blogs) && blogs.length) {
    const sorted = blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    const favorite = sorted[0]
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  } else {
    return {}
  }
}

const mostBlogs = (blogs) => {
  if (Array.isArray(blogs) && blogs.length) {
    const blogsByAuthor = blogs.reduce((a, b) => {
      (a[b.author] = a[b.author] || []).push(b)
      return a
    }, {})
    
    const [authorWithMostBlogs, blogsOfAuthor] = Object.entries(blogsByAuthor).reduce(
      ([maxAuthor, maxBlogs], [author, blogs]) => {
        if (!maxAuthor || blogs.length > maxBlogs.length) {
          return [author, blogs]
        } else {
          return [maxAuthor, maxBlogs]
        }
      },
      [null, []]
    )
    return {
      author: authorWithMostBlogs,
      blogs: blogsOfAuthor.length
    }
  } else {
    return {}
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}