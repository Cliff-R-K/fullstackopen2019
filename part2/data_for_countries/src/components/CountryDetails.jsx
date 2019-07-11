import React from 'react';
import Languages from './Languages';
import Weather from './Weather';




const CountryDetails = ({ country }) =>
    
    <div>
        <h2>{country.name}</h2>
        <p style={{ margin: 0 }}>capital {country.capital}</p>
        <p style={{ margin: 0 }}>population {country.population}</p>
        <h3>languages</h3>
        <ul>
            <Languages languages={country.languages} />
        </ul>
        <img src={country.flag} height="100" width="100" alt="country flag" />
        <Weather capital={country.capital} />
    </div>

export default CountryDetails