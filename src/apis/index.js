import { httpRequest } from "../utlis/httpRequest";


export  function  getWeatherInformationBasedOnCountry(apiBaseUrl, appID, city){
    return  httpRequest({
        url: `${apiBaseUrl}/weather/`,
        params: `?q=${city}&appid=${appID}`
      })
  
}