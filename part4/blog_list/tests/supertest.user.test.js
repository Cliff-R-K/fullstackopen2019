const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user at db', () => {
    beforeEach(async() => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'secret' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'clikar',
            name: 'Cliff Karlsson',
            password: 'guybrush',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails if password is to short ', async() => {
        const newUser = {
            username: 'newUser',
            name: 'newName',
            password: 'iq',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

})

afterAll(() => {
    mongoose.connection.close()
})