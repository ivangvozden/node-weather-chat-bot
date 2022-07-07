const syncRequest = require("sync-request");

module.exports = {
  findCityByName: (input) => {
    return syncRequest(
      'GET',
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + encodeURIComponent(input)
      + "&types=(cities)&language=en&key=" + process.env.GOOGLE_API_KEY
    );
  }
}
