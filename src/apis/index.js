import { httpRequest } from "../utlis/httpRequest";


export  function  getWeatherInformationBasedOnCountry(apiBaseUrl, appID, city){
    return  httpRequest({
        url: `${apiBaseUrl}/weather/`,
        params: `?q=${city}&appid=${appID}`
      })
}

export  function  getCityInfo(apiBaseUrl,  token, search){
  return  httpRequest({
      url: `${apiBaseUrl}/city`,
      params: `?country=IN&name=${search}&limit=5`,
      headers: {
        'X-Api-Key': `${token}`
      }
    })
}