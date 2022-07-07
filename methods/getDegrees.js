module.exports = function getDegrees(unitOfMeasurement) {
  return unitOfMeasurement == 'metric' ? '°C' : '°F';
}
