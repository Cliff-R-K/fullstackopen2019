import React from 'react'
import Person from './Person';

const Persons = ({ filter, persons, removePerson }) => {

    if (filter.length > 0)
        persons = persons.filter(person => (person.name.toLowerCase().includes(filter)) || person.number.includes(filter))

    return (persons.map(person =>
        
        <Person key={person.id} person={person} removePerson={removePerson}/>
    ))
}

export default Persons