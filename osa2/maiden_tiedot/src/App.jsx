import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      find countries<input value={search} onChange={handleSearch}/>
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="
  useEffect(() => {
    axios
      .get(`${weatherUrl}${country.capital}&appid=${api_key}&units=metric`)
      .then(res => {
        setWeather(res.data)
        setWeatherIcon(res.data.weather[0].icon)
      })
    }, [country])
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang, index) => <li key={index}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.capital}</h2>
      {weather && weatherIcon && (
        <div>
          <div>temperature {weather.main.temp} Celsius</div>
          <img src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`} />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}

const Countries = ({ countries, countryDetail, searchNotEmpty, showButton }) => {
  if (countries.length <= 10 && countries.length > 1) {
    return (
      countries.map(country => <div key={country.cca2}>{country.name.common} <button onClick={() => showButton(country)}>show</button></div>)
    )
  }
  if (countries.length > 10) {
    if (searchNotEmpty) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
  }
  if (countryDetail) {
    return (
      <Country country={countryDetail}/>
    )
  }
}

function App() {
  const [countrySearch, setCountrySearch] = useState('')
  const [country, setCountry] = useState(null)
  const [countryDetail, setCountryDetail] = useState(null)
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const allCountriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
  const countryUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"

  useEffect(() => {
    axios
      .get(allCountriesUrl)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (country) {
      axios
        .get(`${countryUrl}/${country.name.common}`)
        .then(response => {
          setCountryDetail(response.data)
        })
    }
  }, [country])
  
  const handleShowButton = (country) => {
    setCountry(country)
  }
  
  const handleSearchChange = (event) => {
    setCountrySearch(event.target.value.toLowerCase())
    var updatedCountries = [...countries]
    updatedCountries = countries.filter(p => p.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    if (updatedCountries.length === 1) {
      setCountry(updatedCountries[0])
    }
    else {
      setCountry(null)
    }
    setFilteredCountries(updatedCountries)
    setCountryDetail(null)
  }

  const searchNotEmpty = countrySearch.trim() !== '';

  return (
    <div>
      <Filter search={countrySearch} handleSearch={handleSearchChange}/>,
      {!countryDetail && <Countries countries={filteredCountries} countryDetail={country} searchNotEmpty={searchNotEmpty} showButton={handleShowButton}/>}
      {countryDetail && <Country country={countryDetail} />}
    </div>
  )
}

export default App
