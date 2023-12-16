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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}