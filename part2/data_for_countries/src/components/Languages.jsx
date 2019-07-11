import React from 'react'

const Languages = ({ languages }) => 
languages.map(language => <li key={language.iso639_1}>{language.name}</li>)

export default Languages