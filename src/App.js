import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import WeatherInfoComp from './WeatherInfoComp';
import SearchBar from './SearchBar';
import ErrorLoadingHoc from './ErrorLoadingHoc';
import { getWeatherInformationBasedOnCity, getWeatherInformationBasedOnLatAndLon } from './apis/';
import isEmpty from './utlis/isEmpty';

const API_TOKEN = process.env.WEATHER_API_TOKEN;
const API_BASE_URL = process.env.API_BASE_URL;

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loader, setLoader] = useState(false);
  const [position, setPosition] = useState({});

  function handleCityClick(name) {
    setLocation(name);
  }

  useEffect(() => {
    if (location) {
      setLoader(true);
      getWeatherInformationBasedOnCity(API_BASE_URL, API_TOKEN, location)
        .then((data) => {
          if (data.cod >= 200 && data.cod < 299) {
            setWeatherData(data);
          } else {
            setWeatherData('');
          }

          setLoader(false);
        })
        .catch(() => setLoader(false));
    }
  }, [location]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      setLoader(true);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        function () {
          setLoader(false);
        }
      );
    } else {
      console.log('Geolocation is not available in your browser.');
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(position)) {
      setLoader(true);
      getWeatherInformationBasedOnLatAndLon(
        API_BASE_URL,
        API_TOKEN,
        position?.latitude,
        position?.longitude
      )
        .then((data) => {
          if (data.cod >= 200 && data.cod < 299) {
            setWeatherData(data);
          } else {
            setWeatherData('');
          }
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    }
  }, [position]);

  return (
    <Layout>
      <SearchBar handleCityClick={handleCityClick} />
      <ErrorLoadingHoc
        loading={loader}
        noResultFound={isEmpty(weatherData)}
        initialPage={location === '' && isEmpty(position)}
      >
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
