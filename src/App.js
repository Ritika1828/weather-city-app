import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import WeatherInfoComp from './WeatherInfoComp'
import SearchBar from './SearchBar'
import {getWeatherInformationBasedOnCountry} from './apis/'

const API_TOKEN = process.env.WEATHER_API_TOKEN
const API_BASE_URL = process.env.API_BASE_URL

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('patna')
  const [weatherData, setWeatherData] = useState({})

  useEffect(()=> {
    getWeatherInformationBasedOnCountry(API_BASE_URL, API_TOKEN, location).then((data)=> setWeatherData(data))
  }, [location])

  console.log(weatherData, 'weatherInfo')


  return (
    <Layout>
       <SearchBar/>
       <WeatherInfoComp  cityName={weatherData?.name} windInfo={weatherData?.wind} temperatureInfo={weatherData?.main} weatherInfo={weatherData?.weather?.[0]} />
    </Layout>
  );
}

export default App;
