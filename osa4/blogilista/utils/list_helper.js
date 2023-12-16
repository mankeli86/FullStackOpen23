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

module.exports = {
  dummy,
  totalLikes
}