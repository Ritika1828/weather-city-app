import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { CLOUD, RAIN, SKY, SNOW, DRIZZLE, IMAGE_PATH_OBJECT } from '../constants/imagePathObject';
import styles from './index.module.scss';

const getWeatherIcon = (icon) => {
  if (icon === '02d' || icon === '02n') {
    return CLOUD;
  } else if (icon === '03d' || icon === '03n' || icon === '04d' || icon === '04n') {
    return DRIZZLE;
  } else if (icon === '09d' || icon === '09n' || icon === '10d' || icon === '10n') {
    return RAIN;
  } else if (icon === '13d' || icon === '13n') {
    return SNOW;
  } else {
    return SKY;
  }
};

function WeatherInfo({ cityName, windInfo, temperatureInfo, weatherInfo }) {
  return (
    <div className={styles.container}>
      <div className={styles.container__top}>
        <div className={styles.container__top__box1}>
          <p>{cityName}</p>
          <h1>{Math.ceil(temperatureInfo?.temp)} °C</h1>
        </div>
        <div className={styles.container__top__box2}>
          <div className={styles.container__top__box2__wrapper}>
            <img
              src={IMAGE_PATH_OBJECT[getWeatherIcon(weatherInfo?.icon)]}
              height={'90px'}
              width={'90px'}
            />
            <p>{weatherInfo?.main}</p>
          </div>
        </div>
      </div>
      <div className={styles.container__bottom}>
        <div className={styles.container__bottom__feels}>
          <h3>{Math.ceil(temperatureInfo?.feels_like)} °C</h3>
          <p>Feels Like</p>
        </div>
        <div className={styles.container__bottom__humidity}>
          <h3>{temperatureInfo?.humidity}</h3>
          <p>Humidity</p>
        </div>
        <div className={styles.container__bottom__wind}>
          <h3>{windInfo?.speed} m/sec</h3>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

WeatherInfo.propTypes = {
  cityName: PropTypes.string, // name of city you have searched
  windInfo: PropTypes.object, // Information related to wind (speed, direction etc..) coming from api
  temperatureInfo: PropTypes.object, // Information related to temperature (feel like, temp ,  etc..) coming from api
  weatherInfo: PropTypes.object // Information related to weather (cloudy, rainly ,icons etc..) coming from api
};

export default memo(WeatherInfo);
