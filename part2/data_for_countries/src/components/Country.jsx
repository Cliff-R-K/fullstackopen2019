import React from 'react'
import CountryDetails from './CountryDetails';
import CountryListing from './CountryListing';


const Country = ({ country, onlyMatch, setInput }) =>
    onlyMatch ?
        <CountryDetails country={country} />
        : <CountryListing country={country} setInput={setInput} />


export default Country