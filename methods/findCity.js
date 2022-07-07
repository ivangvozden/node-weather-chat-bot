const googleMaps = require("../integrations/googleMaps");

module.exports = function findCity(input) {
  var cityFound;
  
  if(input) {
    var mapsResponse = googleMaps.findCityByName(input)
    let citySuggestions = JSON.parse(mapsResponse.getBody());
    
    if(citySuggestions.predictions && citySuggestions.predictions.length) {
      cityFound = citySuggestions.predictions[0].description;
    } else {
      console.error("Unable to get city");
    }
  }
  
  return cityFound;
}
