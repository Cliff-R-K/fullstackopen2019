import React from 'react'


const buttonHandler = (country, setInput) => {
    setInput(country.name.toLowerCase())

}

const CountryListing = ({ country, setInput }) =>
    <p style={{ margin: 0 }}>{country.name} <button onClick={() => buttonHandler(country, setInput)}>show </button></p>


export default CountryListing