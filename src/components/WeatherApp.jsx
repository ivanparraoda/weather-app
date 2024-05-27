import { useEffect, useState } from 'react'

export const WeatherApp = () => {
  const key = '2cb702b36d7a7944e25f38209cbe8c6c'
  const URL = `https://api.openweathermap.org/data/2.5/weather`
  const kelvin = 273.15
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchClima()
  }

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  const fetchClima = async () => {
    if (!city) return
    try {
      const response = await fetch(`${URL}?q=${city}&appid=${key}`)
      const data = await response.json()
      console.log(data)
      setWeather(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={city}
          placeholder='Enter city name'
          onChange={handleCityChange}
        />
        <button>Get Weather</button>
      </form>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {parseInt(weather.main.temp - kelvin)}°C</p>
          <p>Feels like: {weather.main.feels_like}</p>
        </div>
      )}
    </>
  )
}
