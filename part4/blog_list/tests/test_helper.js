const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
        title: 'firstTitle',
        author: 'firstAuthor',
        url: 'firstURL',
        likes: 1
    },
    {
        title: 'secondTitle',
        author: 'secondAuthor',
        url: 'secondURL',
        likes: 2
    }
]

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const findBlogInDb = async(filter) => {
    const blog = await Blog.findOne(filter)
    return blog.toJSON()
}

module.exports = {
    initialBlogs,
    blogsInDb,
    findBlogInDb,
    usersInDb
}