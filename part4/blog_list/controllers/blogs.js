const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))

})

blogsRouter.get('/:id', async(request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)

    }
})

blogsRouter.post('/', async(request, response, next) => {
    const body = request.body
    const blog = new Blog(body)

    try {
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())

    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async(request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async(request, response, next) => {
    const body = request.body

    try {
        const savedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
        response.json(savedBlog.toJSON())

    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter