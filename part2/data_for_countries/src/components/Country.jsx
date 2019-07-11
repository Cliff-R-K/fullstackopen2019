import React from 'react'
import CountryDetails from './CountryDetails';

const Country = ({ country, onlyMatch }) =>
    onlyMatch ?
        <CountryDetails country={country} />
        : <p style={{ margin: 0 }}>{country.name}</p>


export default Country