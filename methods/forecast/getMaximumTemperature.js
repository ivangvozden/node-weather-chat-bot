module.exports = function getMaximumTemperature({ weatherData, timeframe }) {
  let weatherReport;
  
  if(!timeframe || (timeframe && timeframe == 'today')) {
    weatherReport = 'Today in ' + city + ' you can expect maximal temperature of ' + weatherData.list[0].main.temp_max + degrees;
  } else {
    if(timeframe == 'tommorow') {
      weatherReport = 'Tommorow in ' + city + ' you can expect maximal temperature of ' + weatherData.list[1].main.temp_max + degrees;
    } else {
      weatherReport = 'Forecast for ' + city + ' is:';
      weatherData.list.forEach(function(item) {
        if(item) {
          if(weatherReport) {
            if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
              weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect maximal temperature of ' + item.main.temp_max + degrees;
            }
          } else {
            weatherReport = 'On ' + item.dt_txt + ' you can expect maximal temperature of ' + item.main.temp_max + degrees;
          }
        }
      });

    }
  }
  
  return weatherReport
}
