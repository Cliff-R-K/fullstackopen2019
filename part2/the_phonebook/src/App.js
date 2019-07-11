import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [showFiltered, setFiltered] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])
  
  const isNumberDuplicate = () => persons.some((person) => { return (person.name === newName || person.number === newNumber) })

  const addPersonToList = (event) => {
    event.preventDefault()
    if (!isNumberDuplicate()) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNumber('')
    }

    else {
      alert(`${newName} or ${newNumber} is already added to the phonebook`)
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFiltered(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={showFiltered} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPersonToList} newName={newName} nameHandler={handleNameChange} newNumber={newNumber} numberHandler={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filter={showFiltered} persons={persons} />
    </div >
  )
}

export default App