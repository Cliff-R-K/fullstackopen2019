import React from 'react'
import Country from './Country';

const Countries = ({ countries }) => 
    countries.length > 10
        ? <p>Too many matches, specify another filter</p>
        : countries.map(country => 
        <Country key={country.alpha2Code} country={country} onlyMatch={countries.length === 1}/>)


export default Countries