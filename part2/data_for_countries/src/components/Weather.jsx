import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {

    const [weather, setWeather] = useState()

    const getWeatherData = () => {
        let key = 'c1b93947c8184122a67134918191107'
        let url = `http://api.apixu.com/v1/current.json?key=${key}&q=${capital}`
        axios.get(url)
            .then((response) => {
                setWeather(response.data)
            })
    }

    useEffect(getWeatherData, [])

    return (
        weather ?
            <>
                <h2>Weather in {capital}</h2>
                <p style={{ marginBottom: 0,fontSize:"1.2em" }}><strong>temperature: </strong>{weather.current.temp_c} Celsius</p>
                <img src={weather.current.condition.icon} height="100" width="100" alt="weather icon" />
                <p style={{ marginTop: 0,fontSize:"1.2em" } }><strong>wind: </strong>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
            </>
            : <p>Loading...</p>
    )

}

export default Weather