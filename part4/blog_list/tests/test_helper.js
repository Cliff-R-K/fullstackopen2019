const Blog = require('../models/blog')

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


const findBlogInDb = async(filter) => {
    const blog = await Blog.findOne(filter)
    return blog.toJSON()
}

module.exports = { initialBlogs, blogsInDb, findBlogInDb }