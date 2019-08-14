const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async() => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async() => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returns the correct number of blogs', async() => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(2)
    })

    test('_id should be renamed to id ', async() => {
        const response = await api.get('/api/blogs')
        response.body.map(blog => expect(blog.id).toBeDefined())
    })


})

describe('Creating blogs', () => {
    test('success creating a new blog with statuscode 200 ', async() => {
        const newBlogPost = { title: "testTitle", author: "testAuthor", url: "testURL", likes: 10 }

        await api
            .post('/api/blogs')
            .send(newBlogPost)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsInDb = await helper.blogsInDb()
        expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1)

        const titles = blogsInDb.map(blog => blog.title)
        expect(titles).toContain(newBlogPost.title)


    })

    test('if likes is missing defaults to 0', async() => {
        const noLikesBlogPost = { title: 'testTitle2', author: 'testAuthor2', url: 'testURL2' }
        await api
            .post('/api/blogs')
            .send(noLikesBlogPost)
        const blogWithoutLikes = await helper.findBlogInDb({ title: 'testTitle2' })
        expect(blogWithoutLikes.likes).toBe(0)
    })

    test('fails when title AND url is missing', async() => {
        const blogWithMissingTitleAndURL = { author: "afdfdsfds", likes: 10 }

        await api
            .post('/api/blogs')
            .send(blogWithMissingTitleAndURL)
            .expect(500)

    })

    test('success when title is missing and url exists', async() => {
        const blogWithMissingTitle = { author: "a", url: "b" }
        await api
            .post('/api/blogs')
            .send(blogWithMissingTitle)
            .expect(200)
    })

    test('success when url is missing and title exists', async() => {
        const blogWithMissingURL = { author: "fdsfdsffsd", title: "fsfsdf" }
        await api
            .post('/api/blogs')
            .send(blogWithMissingURL)
            .expect(200)
    })
})

describe('deletion of a blog', () => {
    test('success with status code 204', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
    })
})


describe('changing blog', () => {
    test('success changing blog with statuscode 200', async() => {
        const blog = {
            "title": "changed blog",
            "author": "newAuthor",
            "url": "http://example.com"
        }
        const blogsAtStart = await helper.blogsInDb()
        const titlesBefore = blogsAtStart.map(blog => blog.title)
        expect(titlesBefore).not.toContain(blog.title)


        const id = blogsAtStart[0].id
        console.log(`id is: ${id}`);
        await api
            .put(`/api/blogs/${id}`)
            .send(blog)
            .expect(200)

        const blogsAfter = await helper.blogsInDb()
        const titlesAfter = blogsAfter.map(blog => blog.title)
        expect(titlesAfter).toContain(blog.title)

    })
})

afterAll(() => {
    mongoose.connection.close()
})