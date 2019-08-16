const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')


console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


const errorHandler = (error, request, response, next) => {
    console.log(`Error name: ${error.name}
    Error-Message: ${error.message}`)
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    } else if (error.name === 'JsonWebTokenError' && error.message === 'jwt malformed') {
        return response.status(400).send({ error: "token is not in correct format" })
    } else if (error.name === 'JsonWebTokenError' && error.message === 'jwt must be provided') {
        return response.status(400).send({ error: "Authorization Header is missing" })
    }

    next(error)
}

const requestLogger = (request, response, next) => {

    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        request.token = token
    }
    next()
}

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)
module.exports = app