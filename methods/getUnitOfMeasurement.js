module.exports = function getUnitOfMeasurement(preference = null) {
  return preference == 'metric' ? '°C' : '°F';
}
