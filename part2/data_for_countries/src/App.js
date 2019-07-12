import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries';
import Form from './components/Form';

const App = (props) => {

const [countries, setCountries] = useState([])
const [input, setInput] = useState('')

const handleInput = (event) => {
  console.log(event.target.value)
  setInput(event.target.value)
} 

const filterCountries = () => 
 countries.filter(country => country.name.toLowerCase().includes(input))


const hook = () => {
  console.log('effect')
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
}

useEffect(hook, [])
  
return (
    <div >
      <Form input={input} onChange={handleInput}/>
      <Countries setInput={setInput} countries={filterCountries()} />
    </div>
  );
}

export default App;
