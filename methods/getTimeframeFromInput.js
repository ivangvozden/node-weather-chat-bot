module.exports = function getTimeframeFromInput(input) {
  var timeframe;
  
  constants.AVAILABLE_TIMEFRAMES.forEach(function(item) {
    var cleanInput = input.replace(item, '');
    if(cleanInput != input) {
      timeframe = item;
      input = cleanInput;
    }
  });

  constants.UNAVAILABLE_TIMEFRAMES.forEach(function(item) {
    var cleanInput = input.replace(item, '');
    if(cleanInput != input) {
      timeframe = item;
      input = cleanInput;
    }
  });
  
  return timeframe;
}
