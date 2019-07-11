import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries';

const App = (props) => {

const [countries, setCountries] = useState([])
const [input, setInput] = useState('')

const handleInput = (event) => {
  console.log(event.target.value)
  setInput(event.target.value)
} 

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
      <form>
        find countries <input value={input} onChange={handleInput} />
      </form>
      <Countries countries={countries.filter(country => country.name.toLowerCase().includes(input))} />
    </div>
  );
}

export default App;
