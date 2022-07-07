module.exports = function getCityFromInput(input) {
  const LOCATION_PREDICTIONS = ['in', 'on', 'at', 'for'];
  
  let cityFound;
  let timeframe;
  let isLocationPresent = false;

  if(input && input.includes(" ")) {
    input = input.replace('!', '')
      .replace('?', '')
      .replace('=', '')
      .replace('&', '');
    
    LOCATION_PREDICTIONS.forEach(function(item) {
      if(input.indexOf(' ' + item + ' ') > -1) {
        input = input.substring(input.indexOf(' ' + item + ' ') + item.length + 1);
        isLocationPresent = true;
      }
    });
    
    if(!isLocationPresent) return null;
    
    constants.AVAILABLE_TIMEFRAMES.forEach(function(item) {
      let cleanInput = input.replace(item, '');
      
      if(cleanInput != input) {
        timeframe = item;
        input = cleanInput;
      }
    });
    
    constants.UNAVAILABLE_TIMEFRAMES.forEach(function(item) {
      let cleanInput = input.replace(item, '');
      
      if(cleanInput != input) {
        timeframe = item;
        input = cleanInput;
      }
    });
    
    cityFound = findCity(input);
    
    if(!cityFound) {
      let wordsEntered = input.split(/\s+/);
      
      if(wordsEntered) {
        wordsEntered.forEach(function(word) {
          cityFound = findCity(word);
          if(cityFound) return;
        });
      }
    }
  } else {
    if(input) {
      cityFound = findCity(input);
    } else {
      return null;
    }
  }
  
  return new Forecast(cityFound, timeframe);
}
