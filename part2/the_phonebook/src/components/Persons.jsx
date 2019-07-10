import React from 'react'
import Person from './Person';

const Persons = ({filter, persons}) => {

    if (filter.length > 0) {
        const filteredPersons = persons.filter(person => (person.name.toLowerCase().includes(filter)) || person.number.includes(filter))
        return (filteredPersons.map(person => <Person key={person.name} name={person.name} number={person.number} />))
    }
    else {
        return (persons.map(person => <Person key={person.name} name={person.name} number={person.number} />))
    }
}

export default Persons