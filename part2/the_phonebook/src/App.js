import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [showFiltered, setFiltered] = useState('')

  const addAll = () => {
    phonebookService.getAll().then(storedPhonebook => { setPersons(storedPhonebook) })
  }

  useEffect(addAll, [])

   const addPersonToList = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }
    phonebookService.create(newPerson).then(response => {
      console.log('Response from App: ', response);
      if (response) {
        const indexOfElement = persons.findIndex(p => p.name === response.name)
        console.log('Before', persons, 'Index', indexOfElement);
        persons[indexOfElement].number = response.number

        console.log('after', persons);
        setPersons(persons)
        setNewName('')
        setNumber('')
      }
    })
  }

  const removePerson = person => {
    const confirmation = window.confirm(`delete ${person.name} ?`)
    console.log('Confirmation', confirmation)
    if (confirmation) {
      phonebookService.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
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
      <Persons filter={showFiltered} persons={persons} removePerson={removePerson} />
    </div >
  )
}

export default App