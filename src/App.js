import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import WeatherInfoComp from './WeatherInfoComp';
import SearchBar from './SearchBar';
import ErrorLoadingHoc from './ErrorLoadingHoc'
import { getWeatherInformationBasedOnCountry } from './apis/';
import isEmpty from "./utlis/isEmpty"

const API_TOKEN = process.env.WEATHER_API_TOKEN;
const API_BASE_URL = process.env.API_BASE_URL;

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loader, setLoader] = useState(false);

  function handleCityClick(name) {
    setLocation(name);
  }

  useEffect(() => {
    if(location) {
      setLoader(true);
      getWeatherInformationBasedOnCountry(API_BASE_URL, API_TOKEN, location)
        .then((data) => {
          if(data.cod >= 200 && data.cod < 299){
            setWeatherData(data);
          } else {
            setWeatherData('')
          }
          
          setLoader(false);
        })
        .catch(() => setLoader(false));
    }
  }, [location]);

  return (
    <Layout>
      <SearchBar handleCityClick={handleCityClick} />
      <ErrorLoadingHoc loading={loader} noResultFound={isEmpty(weatherData)} initialPage={location === ''}>
        <WeatherInfoComp
          cityName={weatherData?.name}
          windInfo={weatherData?.wind}
          temperatureInfo={weatherData?.main}
          weatherInfo={weatherData?.weather?.[0]}
        />
      </ErrorLoadingHoc>
    </Layout>
  );
}

export default App;
