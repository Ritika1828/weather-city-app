import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import Layout from './Layout'; // Import Layout component
import WeatherInfoComp from './WeatherInfoComp'; // Import WeatherInfoComp component
import SearchBar from './SearchBar'; // Import SearchBar component
import ErrorLoadingHoc from './ErrorLoadingHoc'; // Import ErrorLoadingHoc component
import { getWeatherInformationBasedOnCity, getWeatherInformationBasedOnLatAndLon } from './apis/'; // Import API functions
import isEmpty from './utlis/isEmpty'; // Import isEmpty utility function

const API_TOKEN = process.env.WEATHER_API_TOKEN; // Get weather API token from environment variables
const API_BASE_URL = process.env.API_BASE_URL; // Get API base URL from environment variables


function App() {
  const [location, setLocation] = useState(''); // State for storing location (city name)
  const [weatherData, setWeatherData] = useState({}); // State for storing weather data
  const [loader, setLoader] = useState(false); // State for loader
  const [position, setPosition] = useState({}); // State for geolocation position
  const [err, setErr] = useState(false); // State for error

  // Function to handle city click
  function handleCityClick(name) { 
    setLocation(name); // Set location state to the clicked city name
  }

  // Effect hook to fetch weather information based on city when location changes
  useEffect(() => {
    if (location) {
      setErr(false)
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
        .catch(() => {setLoader(false); setErr(true);});
    }
  }, [location]);


  // Effect hook to fetch geolocation position
  useEffect(() => {
    if ('geolocation' in navigator) {
      setLoader(true);
      setErr(false);
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


  // Effect hook to fetch weather information based on geolocation position
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
          setErr(true);
        });
    }
  }, [position]);

  return (
    <Layout>
      <SearchBar handleCityClick={handleCityClick} loader={loader}/>
      <ErrorLoadingHoc
        loading={loader}
        noResultFound={isEmpty(weatherData)}
        initialPage={location === '' && isEmpty(position)}
        err={err}
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
