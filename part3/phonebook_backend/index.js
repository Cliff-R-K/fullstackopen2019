const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())


morgan.token('person', (request, response) => {

    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(bodyParser.json())
let persons = [{
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Phonebook Backend</h1><p>View stored persons at http://localhost:3001/api/persons</p>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const numberOfPeople = persons.length
    const date = new Date()
    res.send(`<p>Phonebook has info for ${numberOfPeople} people</p>
    <p>${date}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    // console.log(req.body)
    const body = req.body

    const nameExists = persons.some(p => p.name === body.name)

    if (!body.name || !body.number || nameExists) {
        // console.log(`Name ${body.name} Number ${body.number} NameExistes: ${nameExists}`);
        return res.status(400).json({ error: nameExists ? "name is already added" : "name or number missing" })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateRandomId()
    }
    persons = persons.concat(person)
    res.json(person)

})

// const generateId = () => {
//   const maxId = persons.length > 0 ?
//   Math.max(...persons.map(p => p.id))
//   :0
//   return maxId +1
// }

const generateRandomId = () => Math.floor(Math.random() * 10000000)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
