var PreviousCommunication = function (city, unitOfMeasurement, lastMessage) {
  this.city = city;
  this.unitOfMeasurement = unitOfMeasurement;
  this.lastMessage = lastMessage;
}

var PreviousCommunication = function (stringData) {
  try {
    var data = JSON.parse(stringData);
    if(data != null) {
      this.city = data.city;
      this.unitOfMeasurement = data.unitOfMeasurement;
      this.lastMessage = data.lastMessage;
    }
  } catch(err) {
  }
}

PreviousCommunication.prototype.city = {}
PreviousCommunication.prototype.unitOfMeasurement = {}
PreviousCommunication.prototype.lastMessage = {}

module.exports = PreviousCommunication;