const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce((sum, acc) => sum + acc.likes, 0)
    return totalLikes
}

const favoriteBlog = (blogs) => {
    let mostLikedBlog

    if (blogs.length > 0) {
        const maxLikes = Math.max(...blogs.map(blog => blog.likes))
        const blogPost = blogs.find(blog => blog.likes === maxLikes)
        mostLikedBlog = (({ title, author, likes }) => ({ title, author, likes }))(blogPost)
    } else {
        mostLikedBlog = {}
    }
    return (mostLikedBlog)
}

const mostBlogs = (blogs) => {
    let blogMap = new Map()
    blogs.forEach(element => {
        let newValue = 1
        if (blogMap.has(element.author)) {
            newValue = blogMap.get(element.author) + 1
        }
        blogMap.set(element.author, newValue)
    })

    const maxPosts = Math.max(...blogMap.values())
    let author = {}

    blogMap.forEach((v, k) => {
        if (v === maxPosts) {
            console.log(k, v)
            author = { author: k, blogs: v }
        }
    })

    return author
}

const mostLikes = (blogs) => {
    let blogMap = new Map()

    blogs.forEach(blog => {
        const { author, likes } = blog
        let newValue = likes
        if (blogMap.has(author)) {
            newValue = blogMap.get(author) + likes
        }
        blogMap.set(author, newValue)
    })

    const maxLikes = Math.max(...blogMap.values())
    let author = {}

    blogMap.forEach((v, k) => {
        if (v === maxLikes) {
            console.log(k, v)
            author = { author: k, likes: v }
        }
    })

    return author
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}