/* console.log('Start\n');
const animals = [
    { name: "Harry", speicies: "dog", price: 100 },
    { name: "Barry", speicies: "dog", price: 123 },
    { name: "Larry", speicies: "cat", price: 77 },
    { name: "Jarry", speicies: "dog", price: 345 },
    { name: "Tarry", speicies: "fish", price: 22 },
    { name: "Marry", speicies: "cat", price: 91 },
]
const animal = { name: "Marry", speicies: "cat", price: 91 }

console.log('Filter')
const filteredArray = animals.filter(animal => animal.speicies === 'cat')
console.log(filteredArray);

console.log('Map')
const animalNames = animals.map(animal => animal.name)
console.log(animalNames);

console.log('Reduce')
const sum = animals.reduce((sum, acc) => sum + acc.price, 0)
console.log(`Sum is: ${sum}`)

console.log('Max Price');
const maxPrice = Math.max(...animals.map(x => x.price))
const mostExpensiveAnimal = animals.find(a => a.price === maxPrice)
console.log(`Max price is ${mostExpensiveAnimal.name}`)

 console.log('Spread:')
//const subset = (({ name, price }) => ({ name, price }))(animal)
const subset 
console.log(subset) 
let myMap = new Map()
myMap.set("dog", 1)
myMap.set("cat", 9)
myMap.set("fish", 3)
const maxValue = Math.max(...myMap.values())
let maxAnimal = myMap.forEach((v, k) => {
    if (v === maxValue) {
        console.log(k, v)
        return k
    }
})
console.log(maxAnimal) */

/* 
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const httpGet = async() => {
    const result = await api.get('/api/blogs')
    console.log('Hello ', result)
    mongoose.connection.close()
}

httpGet() 
*/
let s1
let s2 = "hello"

console.log(s1)
console.log(s2)
if (s1) {
    console.log("s2 true")
}