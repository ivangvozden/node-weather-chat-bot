module.exports = function getSnow({ weatherData, timeframe }) {
  let weatherReport;
  
  if(!timeframe || (timeframe && timeframe == 'today')) {
    weatherReport = 'Today in ' + city + ' you can expect humidity of ' + weatherData.list[1].main.humidity + ' %';
  } else {
    if(timeframe == 'tommorow') {
      weatherReport = 'Tommorow in ' + city + ' you can expect humidity of ' + weatherData.list[1].main.humidity + ' %';
    } else {
      weatherReport = 'Forecast for humidity in ' + city + ' is:';
      
      weatherData.list.forEach(function(item) {
        if(item) {
          if(weatherReport) {
            if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
              weatherReport += 'On ' + item.dt_txt + ' you can expect humidity of ' + item.main.humidity + ' %';
            }
          } else {
            weatherReport = 'On ' + item.dt_txt + ' you can expect humidity of ' + item.main.humidity + ' %';
          }
        }
      });
    }
  }
  
  return weatherReport
}
