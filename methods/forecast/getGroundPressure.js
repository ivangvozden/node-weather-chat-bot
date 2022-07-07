module.exports = function getGroundPressure({ weatherData, timeframe }) {
  let weatherReport;
  
  if(!timeframe || (timeframe && timeframe == 'today')) {
    weatherReport = 'Today in ' + city + ' you can expect atmospheric pressure on the ground level of ' + weatherData.list[1].main.ground_level + ' hPa';
  } else {
    if(timeframe == 'tommorow') {
      weatherReport = 'Tommorow in ' + city + ' you can expect atmospheric pressure on the ground level of ' + weatherData.list[1].main.ground_level + ' hPa';
    } else {
      weatherReport = 'Forecast for atmospheric pressure on the ground level in ' + city + ' is:';
      weatherData.list.forEach(function(item) {
        if(item) {
          if(weatherReport) {
            if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
              weatherReport += 'On ' + item.dt_txt + ' you can expect atmospheric pressure on the ground level of ' + item.main.ground_level + ' hPa';
            }
          } else {
            weatherReport = 'On ' + item.dt_txt + ' you can expect atmospheric pressure on the ground level of ' + item.main.ground_level + ' hPa';
          }
        }
      });
    }
  }
  
  return weatherReport;
}
