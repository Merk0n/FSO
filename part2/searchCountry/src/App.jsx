import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [country, setCountry] = useState([]);
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState([]);

  const api = {
    key: 'bd94c1e60e77048e1fcc3d946ba0a381',
    base: 'https://api.openweathermap.org/data/2.5/',
  };

  useEffect(() => {
    if (search === '') {
      return;
    }

    const getCountry = async () => {
      try {
        const baseUrl = `https://restcountries.com/v3.1/name/${search}`;
        const request = axios.get(baseUrl);
        const response = await request;
        console.log(response.data);
        setCountry(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getWeather = async () => {
      try {
        const baseUrl = `${api.base}weather?q=${search}&units=metric&appid=${api.key}`;
        const request = axios.get(baseUrl);
        const response = await request;
        console.log(response.data);
        setWeather(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (search !== country.name) {
      setCountry([]);
    }

    getWeather();

    getCountry();
  }, [search, country.name, api.base, api.key]);

  return (
    <>
      <p>
        find countries
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </p>
      {country.length > 10 && <p>too many matches, specify another filter</p>}

      {country.length > 1 && country.length <= 10 && (
        <ul>
          {country.map((item) => (
            <li key={item.name.common}>
              {item.name.common}
              <button onClick={() => setSearch(item.name.common)}>show</button>
            </li>
          ))}
        </ul>
      )}

      {country.length === 1 &&
        country.map((item) => (
          <div key={item.name.common}>
            <h1>{item.name.common}</h1>
            <p>capital {item.capital}</p>
            <p>population {item.population}</p>
            <h2>languages</h2>
            <ul>
              {Object.values(item.languages).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <img src={item.flags.png} alt={item.name.common} width='100' />

            <h2>Weather in {item.capital}</h2>
            <p>temperature: {weather.main?.temp} Celsius</p>
            <p>humidity: {weather.main?.humidity}%</p>
            <p>
              wind: {weather.wind?.speed} m/s direction {weather.wind?.deg}{' '}
              degrees
            </p>
          </div>
        ))}

      {country.length === 0 && <p>not found</p>}
    </>
  );
}

export default App;
