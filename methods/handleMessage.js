// Handles messages events
module.exports = function handleMessage(received_message, senderId = null) {
  var usersDir = 'users/';
  var userFile = usersDir + (senderId || "") + '.json';
  var previousCommunication;
  var forecast;
  var unitsOfMeasurement = 'metric';
  
  if(!fs.existsSync(usersDir)) {
    fs.mkdirSync(usersDir);
  }
  
  if(fs.existsSync(userFile)) {
    var data = fs.readFileSync(userFile, 'utf8');
    previousCommunication = new PreviousCommunication(data);    
    unitsOfMeasurement = previousCommunication.unitOfMeasurement;
  }
  
  nlpManager.process('en', received_message.text).then((nlpPrediction) => {
    let response;
    
    if(nlpPrediction.intent.indexOf(constants.WEATHER_QUESTIONS) > -1) {
      forecast = getCityFromInput(received_message.text);
      
      if(!forecast && (previousCommunication && previousCommunication.city)) {
        forecast = {
          "city": previousCommunication.city,
          "timeframe": getTimeframeFromInput(received_message.text)
        };
      } else {
        if(forecast) {
          forecast.timeframe = getTimeframeFromInput(received_message.text);
        } else {
          forecast = {
            "city": null,
            "timeframe": getTimeframeFromInput(received_message.text)
          };
        }
      }
    } else {
      if(previousCommunication && previousCommunication.lastMessage && previousCommunication.lastMessage.toString().toLowerCase().indexOf('what') > -1
         && previousCommunication.lastMessage.toString().toLowerCase().indexOf('location') > -1
         && previousCommunication.lastMessage.toString().toLowerCase().indexOf('?') > -1) {
          forecast = getCityFromInput(received_message.text); 
      } else {
        if(nlpPrediction.intent == constants.IMPERIAL_UNITS_OF_MEASUREMENT) {
          unitsOfMeasurement = 'imperial';
        } else if(nlpPrediction.intent == constants.METRIC_UNITS_OF_MEASUREMENT) {
          unitsOfMeasurement = 'metric';
        } 
        
        response = {
          "text": nlpPrediction.answer
        }
      } 
    }
    
    if(forecast && forecast.city) {
      var weatherReport = getWeatherForCity(
        forecast.city,
        forecast.timeframe, 
        unitsOfMeasurement,
        nlpPrediction.intent, nlpPrediction.answer
      );
      
      response = {
        text: weatherReport || 'I tried really hard but couldn\'t get a forecast for your location.'
      }
    } else {
      response = {
        text: nlpPrediction.answer
      }
    }

    if(!previousCommunication || (previousCommunication && previousCommunication.lastMessage != response.text)) {
      if(forecast && forecast.city) {
        previousCommunication = {
           "city": forecast.city,
           "unitOfMeasurement": unitsOfMeasurement,
           "lastMessage": response.text
        };
      } else {
        if(previousCommunication) {
          previousCommunication = {
             "city": previousCommunication.city,
             "unitOfMeasurement": unitsOfMeasurement,
             "lastMessage": response.text
          };
        }
      }
      
      fs.writeFile(
        userFile,
        JSON.stringify(previousCommunication),
        'utf8',
        (err) => console.log(err)
      );
    }
  });
     
  return response;
}
