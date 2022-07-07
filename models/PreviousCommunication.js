let PreviousCommunication = function (city, unitOfMeasurement, lastMessage) {
  this.city = city;
  this.unitOfMeasurement = unitOfMeasurement;
  this.lastMessage = lastMessage;
}

PreviousCommunication.prototype.city = {}
PreviousCommunication.prototype.unitOfMeasurement = ""
PreviousCommunication.prototype.lastMessage = ""

PreviousCommunication.prototype.parse = function (stringData) {
  try {
    var data = JSON.parse(stringData);
    if(data != null) {
      this.city = data.city;
      this.unitOfMeasurement = data.unitOfMeasurement;
      this.lastMessage = data.lastMessage;
    }
  } catch (err) {
    console.log("Failed to parse previous communication", err)
  }
}

module.exports = PreviousCommunication;
