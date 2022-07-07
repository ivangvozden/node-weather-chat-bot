const getForecast = require("./getForecast");
const getSeaLevels = require("./getSeaLevels");
const getGroundPressure = require("./getGroundPressure");
const getHumidity = require("./getHumidity");
const getWind = require("./getWind");
const getRain = require("./getRain");
const getSnow = require("./getSnow");
const getTemperature = require("./getTemperature");
const getMinimalTemperature = require("./getMinimalTemperature");
const getMaximumTemperature = require("./getMaximumTemperature");

const getDegrees = require('../getDegrees');

const openWeather = require('../../integrations/openWeather')

module.exports = function getForecastReport({
  city, timeframe, unitOfMeasurement, questionIntent, defaultAnswer
}) {
  var weatherReport;
  
  if (!unitOfMeasurement) unitOfMeasurement = 'metric';
  
  if (!city) return null;
  
  const latestForecast = openWeather.fetchLatestForecast(city, unitOfMeasurement)
  
  if(latestForecast.statusCode >= 200 && latestForecast.statusCode < 300) {
    const inquiry = {
      weatherData: JSON.parse(latestForecast.getBody()),
      timeframe,
      unitOfMeasurement,
      degrees: getDegrees(unitOfMeasurement),
      questionIntent
    }
    
    switch (questionIntent) {
      case constants.WEATHER_QUESTIONS:
        return getForecast(inquiry);
      case constants.SEA_LEVEL_QUESTIONS:
        return getSeaLevels(inquiry);
      case constants.GROUND_LEVEL_QUESTIONS:
        return getGroundPressure(inquiry);
      case constants.HUMIDITY_QUESTIONS:
        return getHumidity(inquiry);
      case constants.WIND_QUESTIONS:
        return getWind(inquiry);
      case constants.RAIN_QUESTIONS:
        return getRain(inquiry);
      case constants.SNOW_QUESTIONS:
        return getSnow(inquiry);
      case constants.TEMPERATURE_QUESTIONS:
        return getTemperature(inquiry);
      case constants.MINIMAL_TEMPERATURE_QUESTIONS:
        return getMinimalTemperature(inquiry);
      case constants.MAXIMUM_TEMPERATURE_QUESTIONS:
        return getMaximumTemperature(inquiry);
      default:
        return defaultAnswer
    }
  }
  
  return weatherReport;
}
