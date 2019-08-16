const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog
        .find({}).populate('user')

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
    console.log(`token from request ${request.token}`)


    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        console.log(`Decoded token ${decodedToken.id}`)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const blog = new Blog({...body, user: user._id })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())

    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async(request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const currentUserId = decodedToken.id
        const blogToRemove = await Blog.findById(request.params.id)
        console.log(`blogToRemove userId: ${blogToRemove.user} Curret userId: ${currentUserId}
        And they are the same: ${blogToRemove.user.toString() === currentUserId.toString()}`)
        if (blogToRemove.user.toString() === currentUserId.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({ error: 'Only the user that created the blog can delete it.' })
        }

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