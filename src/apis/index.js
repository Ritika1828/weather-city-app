import { httpRequest } from '../utlis/httpRequest';

export function getWeatherInformationBasedOnCity(apiBaseUrl, appID, city) {
  return httpRequest({
    url: `${apiBaseUrl}/weather/`,
    params: `?q=${city}&appid=${appID}&units=metric`
  });
}

export function getWeatherInformationBasedOnLatAndLon(apiBaseUrl, appID, Lat, Log) {
  return httpRequest({
    url: `${apiBaseUrl}/weather/`,
    params: `?lat=${Lat}&lon=${Log}&appid=${appID}&units=metric`
  });
}

export function getCityInfo(apiBaseUrl, token, search) {
  return httpRequest({
    url: `${apiBaseUrl}/city`,
    params: `?country=IN&name=${search}&limit=5`,
    headers: {
      'X-Api-Key': `${token}`
    }
  });
}
