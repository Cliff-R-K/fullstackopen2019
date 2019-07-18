import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}


const create = async newObject => {
    const persons = await getAll()
    const isDuplicate = persons.some(person => {
        return (person.name === newObject.name)
    })
    if (isDuplicate) {
        const confirmation = window.confirm(`${newObject.name} is already added to the phonebook, replace the old number with a new one?`)
        if (confirmation) {
            const person = persons.find(p => p.name === newObject.name)
            update(person.id, newObject)
            return person
        }
    } else {
        const request = axios.post(baseURL, newObject)
        return request.then(response => response.data)
    }

}

const remove = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }