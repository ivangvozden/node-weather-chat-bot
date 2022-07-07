const syncRequest = require("sync-request");

module.exports = {
  fetchLatestForecast: (city, unitOfMeasurement) => {
    return syncRequest(
      "GET",
      "http://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(city)
        + "&units=" + unitOfMeasurement + "&appid=" + process.env.OPENWEATHER_APPID
    );
  }
}
