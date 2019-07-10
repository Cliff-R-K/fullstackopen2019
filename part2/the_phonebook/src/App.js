import React, { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';



const App = () => {
  const [persons, setPersons] = useState([{ name: 'Cliff Karlsson', number: '123456' }, { name: 'Kalle Kanin', number: '0000000' }, { name: 'Adolf Hitler', number: '6666666666' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [showFiltered, setFiltered] = useState('')


/*   const rows = () => {

    if (showFiltered.length > 0) {
      const filteredPersons = persons.filter(person => (person.name.toLowerCase().includes(showFiltered)) || person.number.includes(showFiltered))
      return (filteredPersons.map(person => <Person key={person.name} name={person.name} number={person.number} />))
    }
    else {
      return (persons.map(person => <Person key={person.name} name={person.name} number={person.number} />))
    }

  } */



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