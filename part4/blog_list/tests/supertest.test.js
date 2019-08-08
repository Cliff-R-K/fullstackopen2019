const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Supertest format', () => {

    test('should return json', async() => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('should return correct number of blogs', async() => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(3)
    })

    test('_id should be renamed to id ', async() => {
        const response = await api.get('/api/blogs')
        response.body.map(blog => expect(blog.id).toBeDefined())
    })


})



afterAll(() => {
    mongoose.connection.close()
})