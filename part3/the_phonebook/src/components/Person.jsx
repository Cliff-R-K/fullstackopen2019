import React from 'react'

const Person = ({ person, removePerson }) => <p style={{margin:0}}>{person.name} {person.number}<button onClick={()=>removePerson(person)}>delete</button></p>

export default Person