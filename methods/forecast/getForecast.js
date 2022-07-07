module.exports = function getForecast({ weatherData, timeframe }) {
  let weatherReport;
  
  if(!timeframe || (timeframe && timeframe == 'today')) {
    weatherReport = 'Today in ' + city + ' you can expect '
      + weatherData.list[0].weather[0].description + ' with minimal temperature of '
      + weatherData.list[0].main.temp_min + degrees + ' and maximal temperature of '
      + weatherData.list[0].main.temp_max + degrees;
  } else {
    if(timeframe == 'tommorow') {
      weatherReport = 'Tommorow in ' + city + ' you can expect '
        + weatherData.list[1].weather[0].description + ' with minimal temperature of '
        + weatherData.list[1].main.temp_min + degrees + ' and maximal temperature of '
        + weatherData.list[1].main.temp_max + degrees;
    } else {
      weatherReport = 'For ' + city + ' ';
      
      weatherData.list.forEach(function(item) {
        if(item) {
          if(weatherReport) {
            if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
              weatherReport += 'on ' + item.dt_txt + ' you can expect '
                + item.weather[0].description + ' with minimal temperature of '
                + item.main.temp_min + degrees + ' and maximal temperature of '
                + item.main.temp_max + degrees;
            }
          } else {
            weatherReport += 'on ' + item.dt_txt + ' you can expect '
              + item.weather[0].description + ' with minimal temperature of '
              + item.main.temp_min + degrees + ' and maximal temperature of '
              + item.main.temp_max + degrees;
          }
        }
      });

    }
  }
  
  return weatherReport;
}
