import React, { useState } from 'react'
import Number from './components/Number'



const App = () => {
  const [persons, setPersons] = useState([{ name: 'Cliff Karlsson', number: '123456' }, { name: 'Kalle Kanin', number: '0000000' }, { name: 'Adolf Hitler', number: '6666666666' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [showFiltered, setFiltered] = useState('')


  const rows = () => {

    if (showFiltered.length > 0) {
      const filteredPersons = persons.filter(person => (person.name.toLowerCase().includes(showFiltered)) || person.number.includes(showFiltered))
      return (filteredPersons.map(person => <Number key={person.name} name={person.name} number={person.number} />))
    }
    else {
      return (persons.map(person => <Number key={person.name} name={person.name} number={person.number} />))
    }

  }



  const isNumberDuplicate = () => persons.some((person) => { return (person.name === newName || person.number === newNumber) })

  const addNumber = (event) => {
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
  const handelNumberChange = (event) => {
    setNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFiltered(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input
          value={showFiltered}
          onChange={handleFilterChange}
        />
      </div>
      <form onSubmit={addNumber}>
        <h2>add a new</h2>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handelNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )
}

export default App