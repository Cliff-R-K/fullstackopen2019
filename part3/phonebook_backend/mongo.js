const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://cliff:${password}@cluster0-ix5ws.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true }).catch(
    err => console.log(`Connection error: ${err.name}`)
)



const personSchema = new mongoose.Schema({
    name: String,
    number: String

})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({})
        .then(result => {
            console.log('phonebook:');
            result.forEach(person => console.log(`${person.name} ${person.number}`))
        })
        .finally(() => mongoose.connection.close())

} else {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(respons => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}