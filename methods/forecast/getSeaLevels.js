module.exports = function getSeaLevels({ weatherData, timeframe }) {
  let weatherReport;
  
  if(!timeframe || (timeframe && timeframe == 'today')) {
    weatherReport = 'Today in ' + city + ' you can expect atmospheric pressure on the sea level of '
      + weatherData.list[1].main.sea_level + ' hPa';
  } else {
    if(timeframe == 'tommorow') {
      weatherReport = 'Tommorow in ' + city + ' you can expect atmospheric pressure on the sea level of '
        + weatherData.list[1].main.sea_level + ' hPa';
    } else {
      weatherReport = 'For ' + city + ' ';
      
      weatherData.list.forEach(function(item) {
        if(item) {
          if(weatherReport) {
            if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
              weatherReport += 'on ' + item.dt_txt
                + ' you can expect atmospheric pressure on the sea level of '
                + item.main.sea_level + ' hPa';
            }
          } else {
            weatherReport += 'on ' + item.dt_txt + ' you can expect atmospheric pressure on the sea level of '
              + item.main.sea_level + ' hPa';
          }
        }
      });
    }
  }
  
  return weatherReport;
}
