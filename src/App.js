import { Search, MapPin, Wind } from 'react-feather';
import './App.css';
import getWeather from './api';
import { useState } from 'react';
import dateFormat from 'dateformat';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("");
  }

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  }

  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className='input-wrapper'>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter City Name'
        />
        <button onClick={getWeatherbyCity}>
          <Search />
        </button>
      </div>

      {weather?.weather ? (
        <div className="content">
          <div className="location">
            <MapPin />
            <h2>{weather.name} <span>({weather.sys.country})</span></h2>
          </div>

          <p className="datetext">{renderDate()}</p>

          <div className="weatherdesc d-flex flex-c">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <h3>{weather.weather[0].description}</h3>
          </div>

          <div className="tempstats d-flex flex-c">
            <h1>{weather.main.temp} <span>&deg;C</span></h1>
            <h3>Feels Like {weather.main.feels_like}&deg;C</h3>
          </div>

          <div className="windstats d-flex">
            <Wind />
            <h3>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
          </div>
        </div>
      ) : (
        <div className="content">
          <h4>No Data found!</h4>
        </div>
      )}
    </div>
  );
}

export default App;
