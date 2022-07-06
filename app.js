/*
 * Starter Project for Messenger Platform Quick Start Tutorial
 *
 * Remix this as the starting point for following the Messenger Platform
 * quick start tutorial.
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 */

'use strict';

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const OPENWEATHER_APPID = process.env.OPENWEATHER_APPID;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const Forecast = require('./forecast.js');
const PreviousCommunication = require('./previous-communication.js');

const { NlpManager } = require('node-nlp');
const trainnlp = require('./train-bot.js');

const nlpManager = new NlpManager({ languages: ['en'] });

trainnlp(nlpManager);

const constants = require('./constants.js');

// Imports dependencies and set up http server
const 
  syncRequest = require('sync-request'),
  request = require('request'),
  express = require('express'),
  fs = require('fs'),
  body_parser = require('body-parser'), 
  app = express().use(body_parser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.get('/privacy-policy', (req, res) => {
    res.sendFile(__dirname + '/privacy_policy.html');
});

app.get('/read-me', (req, res) => {
    res.sendFile(__dirname + '/README.md');
});

app.get('/', (req, res) => {
  res.status(200).send('EVENT_RECEIVED');
});

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {
    
      body.entry.forEach(function(entry) {

        // Gets the body of the webhook event
        let webhook_event = entry.messaging[0];
        //console.log(webhook_event);

        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;
        //console.log('Sender PSID: ' + sender_psid);


        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message);        
        } else if (webhook_event.postback) {
          handlePostback(sender_psid, webhook_event.postback);
        }

      });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Check if a token and mode were sent
  if (mode && token) {
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

// Handles messages events
function handleMessage(sender_psid, received_message) {

  var usersDir = 'users/';
  var userFile = usersDir + sender_psid + '.json';
  var previousCommunication;
  var answerPredicted;
  var forecast;
  var unitsOfMeasurement = 'metric';
  
  if(!fs.existsSync(usersDir)) {
      fs.mkdirSync(usersDir);
  }
  
  if(fs.existsSync(userFile)) {
    var data = fs.readFileSync(userFile, 'utf8');
    console.log(data);
    previousCommunication = new PreviousCommunication(data);    
    console.log('previous ->' + JSON.stringify(previousCommunication));
    console.log('previous comm ->' + previousCommunication.lastMessage);
    unitsOfMeasurement = previousCommunication.unitOfMeasurement;
  }
  
  //console.log(received_message.text);
  
  nlpManager.process('en', received_message.text).then((nlpPrediction) => {
    let response;
    
    console.log(nlpPrediction.intent);
    
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
      var weatherReport = getWeatherForCity(forecast.city, forecast.timeframe, 
                          unitsOfMeasurement,
                          nlpPrediction.intent, nlpPrediction.answer);

      if(weatherReport) {
        response = {
          "text": weatherReport
        }
      } else {
        response = {
          "text": 'I tried really hard but couldn\'t get a forecast for your location.'
        }
      }
    } else {
        response = {
          "text": nlpPrediction.answer
        }
    }
    
    console.log('new comm -> ' + response.text); 

    if(!previousCommunication || (previousCommunication && previousCommunication.lastMessage != response.text)) {
      if(forecast && forecast.city) {
        previousCommunication = {
           "city": forecast.city,
           "unitOfMeasurement": unitsOfMeasurement,
           "lastMessage": response.text
        };
      } else {
      console.log(response.text);
        if(previousCommunication) {
          previousCommunication = {
             "city": previousCommunication.city,
             "unitOfMeasurement": unitsOfMeasurement,
             "lastMessage": response.text
          };
        }
      }
      
      console.log(JSON.stringify(previousCommunication));
      fs.writeFile(userFile, JSON.stringify(previousCommunication), 'utf8', function (err) {
         if (err) return console.log(err);
      });

      callSendAPI(sender_psid, response);
    }
  });
     
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  console.log(received_postback);
}
 
// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  //console.log(response);
  
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

function hasWeather(input) {
  if(input) {
    if(input.toLowerCase().indexOf("weather") > -1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}


function getTimeframeFromInput(input) {
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

function getCityFromInput(input) {
  var cityFound;
  var cityPredictionFound;
  
  var timeframe;
  
  const LOCATION_PREDICTIONS = ['in', 'on', 'at', 'for'];
  
  var isLocationPresent = false;

  if(input && input.indexOf(" ") > -1) {
    input = input.replace('!', '').replace('?', '').replace('=', '').replace('&', '');
    
    LOCATION_PREDICTIONS.forEach(function(item) {
      if(input.indexOf(' ' + item + ' ') > -1) {
        input = input.substring(input.indexOf(' ' + item + ' ') + item.length + 1);
        isLocationPresent = true;
      }
    });
    
    if(!isLocationPresent) return null;
    
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
    
    cityFound = checkForCity(input);
    
    if(!cityFound) {
      var wordsEntered = input.split(/\s+/);

      //console.log(input);
      //console.log(wordsEntered);

      if(wordsEntered) {
        wordsEntered.forEach(function(word) {
          cityFound = checkForCity(word);
          if(cityFound) return;
        });
      }
    }
    
  } else {
    if(input) {
       cityFound = checkForCity(input);
    } else {
       return null;
    }
  }
  
  var forecast = new Forecast(cityFound, timeframe);
  
  return forecast;
}

function checkForCity(input) {
  var cityFound;
  
  if(input) {
    var mapsResponse = syncRequest('GET', "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + encodeURIComponent(input) + "&types=(cities)&language=en&key=" + GOOGLE_API_KEY);

    let predictions = JSON.parse(mapsResponse.getBody());
    
    //console.log(predictions);
    
    if(predictions.predictions && predictions.predictions.length > 0) {
        cityFound = predictions.predictions[0].description;
    } else {
      console.error("Unable to get city");
    }

    //console.log(cityFound);
    
  }
  
  return cityFound;
}

function getWeatherForCity(city, timeframe, unitOfMeasurement, questionIntent, defaultAnswer) {
  var weatherReport;
  
  if(!unitOfMeasurement) unitOfMeasurement = 'metric';
  
  var degrees = unitOfMeasurement == 'metric' ? '°C' : '°F';
  
  //console.log(city);
  
  if(city) {
    var openWeatherResponse = syncRequest("GET", "http://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(city) + "&units=" +
                                          unitOfMeasurement + "&appid=" + OPENWEATHER_APPID);
    
    if(openWeatherResponse.statusCode >= 200 && openWeatherResponse.statusCode < 300) {
      var weatherReportParsed = JSON.parse(openWeatherResponse.getBody());
      
      //console.log(weatherReportParsed.list[1]);
      //console.log(city);
      //console.log(timeframe);
      
      if(questionIntent == constants.WEATHER_QUESTIONS) {
        if(!timeframe || (timeframe && timeframe == 'today')) {
          weatherReport = 'Today in ' + city + ' you can expect ' + weatherReportParsed.list[0].weather[0].description + ' with minimal temperature of '
                        + weatherReportParsed.list[0].main.temp_min + degrees + ' and maximal temperature of ' + weatherReportParsed.list[0].main.temp_max + degrees;
        } else {
          if(timeframe == 'tommorow') {
            weatherReport = 'Tommorow in ' + city + ' you can expect ' + weatherReportParsed.list[1].weather[0].description + ' with minimal temperature of '
                          + weatherReportParsed.list[1].main.temp_min + degrees + ' and maximal temperature of ' + weatherReportParsed.list[1].main.temp_max + degrees;
          } else {
            weatherReport = 'Forecast for ' + city + ' is:';
            weatherReportParsed.list.forEach(function(item) {
              if(item) {
                if(weatherReport) {
                  if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
                    weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect ' + item.weather[0].description + ' with minimal temperature of '
                                  + item.main.temp_min + degrees + ' and maximal temperature of ' + item.main.temp_max + degrees;
                  }
                } else {
                  weatherReport = 'On ' + item.dt_txt + ' you can expect ' + item.weather[0].description + ' with minimal temperature of '
                                + item.main.temp_min + degrees + ' and maximal temperature of ' + item.main.temp_max + degrees;
                }
              }
            });

          }
        }
      } else if(questionIntent == constants.SEA_LEVEL_QUESTIONS) {
        if(!timeframe || (timeframe && timeframe == 'today')) {
          weatherReport = 'Today in ' + city + ' you can expect atmospheric pressure on the sea level of ' + weatherReportParsed.list[1].main.sea_level + ' hPa';
        } else {
          if(timeframe == 'tommorow') {
            weatherReport = 'Tommorow in ' + city + ' you can expect atmospheric pressure on the sea level of ' + weatherReportParsed.list[1].main.sea_level + ' hPa';
          } else {
            weatherReport = 'Forecast for atmospheric pressure on the sea level in ' + city + ' is:';
            weatherReportParsed.list.forEach(function(item) {
              if(item) {
                if(weatherReport) {
                  if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
                    weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect atmospheric pressure on the sea level of ' + item.main.sea_level + ' hPa';
                  }
                } else {
                  weatherReport = 'On ' + item.dt_txt + ' you can expect atmospheric pressure on the sea level of ' + item.main.sea_level + ' hPa';
                }
              }
            });
          }
        }
      }  else if(questionIntent == constants.GROUND_LEVEL_QUESTIONS) {
        if(!timeframe || (timeframe && timeframe == 'today')) {
          weatherReport = 'Today in ' + city + ' you can expect atmospheric pressure on the ground level of ' + weatherReportParsed.list[1].main.ground_level + ' hPa';
        } else {
          if(timeframe == 'tommorow') {
            weatherReport = 'Tommorow in ' + city + ' you can expect atmospheric pressure on the ground level of ' + weatherReportParsed.list[1].main.ground_level + ' hPa';
          } else {
            weatherReport = 'Forecast for atmospheric pressure on the ground level in ' + city + ' is:';
            weatherReportParsed.list.forEach(function(item) {
              if(item) {
                if(weatherReport) {
                  if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
                    weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect atmospheric pressure on the ground level of ' + item.main.ground_level + ' hPa';
                  }
                } else {
                  weatherReport = 'On ' + item.dt_txt + ' you can expect atmospheric pressure on the ground level of ' + item.main.ground_level + ' hPa';
                }
              }
            });
          }
        }
      } else if(questionIntent == constants.HUMIDITY_QUESTIONS) {
        if(!timeframe || (timeframe && timeframe == 'today')) {
          weatherReport = 'Today in ' + city + ' you can expect humidity of ' + weatherReportParsed.list[1].main.humidity + ' %';
        } else {
          if(timeframe == 'tommorow') {
            weatherReport = 'Tommorow in ' + city + ' you can expect humidity of ' + weatherReportParsed.list[1].main.humidity + ' %';
          } else {
            weatherReport = 'Forecast for humidity in ' + city + ' is:';
            weatherReportParsed.list.forEach(function(item) {
              if(item) {
                if(weatherReport) {
                  if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
                    weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect humidity of ' + item.main.humidity + ' %';
                  }
                } else {
                  weatherReport = 'On ' + item.dt_txt + ' you can expect humidity of ' + item.main.humidity + ' %';
                }
              }
            });
          }
        }
      } else if(questionIntent == constants.WIND_QUESTIONS) {
        if(!timeframe || (timeframe && timeframe == 'today')) {
          weatherReport = 'Today in ' + city + ' you can expect humidity of ' + weatherReportParsed.list[1].main.humidity + ' %';
        } else {
          if(timeframe == 'tommorow') {
            weatherReport = 'Tommorow in ' + city + ' you can expect humidity of ' + weatherReportParsed.list[1].main.humidity + ' %';
          } else {
            weatherReport = 'Forecast for humidity in ' + city + ' is:';
            weatherReportParsed.list.forEach(function(item) {
              if(item) {
                if(weatherReport) {
                  if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
                    weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect humidity of ' + item.main.humidity + ' %';
                  }
                } else {
                  weatherReport = 'On ' + item.dt_txt + ' you can expect humidity of ' + item.main.humidity + ' %';
                }
              }
            });
          }
        }
      } else if(questionIntent == constants.RAIN_QUESTIONS) {
        if(!timeframe || (timeframe && timeframe == 'today')) {
          weatherReport = 'Today in ' + city + ' you can expect humidity of ' + weatherReportParsed.list[1].main.humidity + ' %';
        } else {
          if(timeframe == 'tommorow') {
            weatherReport = 'Tommorow in ' + city + ' you can expect humidity of ' + weatherReportParsed.list[1].main.humidity + ' %';
          } else {
            weatherReport = 'Forecast for humidity in ' + city + ' is:';
            weatherReportParsed.list.forEach(function(item) {
              if(item) {
                if(weatherReport) {
                  if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
                    weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect humidity of ' + item.main.humidity + ' %';
                  }
                } else {
                  weatherReport = 'On ' + item.dt_txt + ' you can expect humidity of ' + item.main.humidity + ' %';
                }
              }
            });
          }
        }
      } else if(questionIntent == constants.SNOW_QUESTIONS) {
        if(!timeframe || (timeframe && timeframe == 'today')) {
          weatherReport = 'Today in ' + city + ' you can expect humidity of ' + weatherReportParsed.list[1].main.humidity + ' %';
        } else {
          if(timeframe == 'tommorow') {
            weatherReport = 'Tommorow in ' + city + ' you can expect humidity of ' + weatherReportParsed.list[1].main.humidity + ' %';
          } else {
            weatherReport = 'Forecast for humidity in ' + city + ' is:';
            weatherReportParsed.list.forEach(function(item) {
              if(item) {
                if(weatherReport) {
                  if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
                    weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect humidity of ' + item.main.humidity + ' %';
                  }
                } else {
                  weatherReport = 'On ' + item.dt_txt + ' you can expect humidity of ' + item.main.humidity + ' %';
                }
              }
            });
          }
        }
      } else if(questionIntent == constants.TEMPERATURE_QUESTIONS) {
        if(!timeframe || (timeframe && timeframe == 'today')) {
          weatherReport = 'Today in ' + city + ' you can expect ' + weatherReportParsed.list[0].weather[0].description + ' with minimal temperature of '
                        + weatherReportParsed.list[0].main.temp_min + degrees + ' and maximal temperature of ' + weatherReportParsed.list[0].main.temp_max + degrees;
        } else {
          if(timeframe == 'tommorow') {
            weatherReport = 'Tommorow in ' + city + ' you can expect ' + weatherReportParsed.list[1].weather[0].description + ' with minimal temperature of '
                          + weatherReportParsed.list[1].main.temp_min + degrees + ' and maximal temperature of ' + weatherReportParsed.list[1].main.temp_max + degrees;
          } else {
            weatherReport = 'Forecast for ' + city + ' is:';
            weatherReportParsed.list.forEach(function(item) {
              if(item) {
                if(weatherReport) {
                  if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
                    weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect ' + item.weather[0].description + ' with minimal temperature of '
                                  + item.main.temp_min + degrees + ' and maximal temperature of ' + item.main.temp_max + degrees;
                  }
                } else {
                  weatherReport = 'On ' + item.dt_txt + ' you can expect ' + item.weather[0].description + ' with minimal temperature of '
                                + item.main.temp_min + degrees + ' and maximal temperature of ' + item.main.temp_max + degrees;
                }
              }
            });

          }
        }
      } else if(questionIntent == constants.MINIMAL_TEMPERATURE_QUESTIONS) {
        if(!timeframe || (timeframe && timeframe == 'today')) {
          weatherReport = 'Today in ' + city + ' you can expect minimal temperature of ' + weatherReportParsed.list[0].main.temp_min + degrees;
        } else {
          if(timeframe == 'tommorow') {
            weatherReport = 'Tommorow in ' + city + ' you can expect minimal temperature of ' + weatherReportParsed.list[1].main.temp_min + degrees;
          } else {
            weatherReport = 'Forecast for ' + city + ' is:';
            weatherReportParsed.list.forEach(function(item) {
              if(item) {
                if(weatherReport) {
                  if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
                    weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect minimal temperature of ' + item.main.temp_min + degrees;
                  }
                } else {
                  weatherReport = 'On ' + item.dt_txt + ' you can expect minimal temperature of ' + item.main.temp_min + degrees;
                }
              }
            });

          }
        }
      } else if(questionIntent == constants.MAXIMUM_TEMPERATURE_QUESTIONS) {
        if(!timeframe || (timeframe && timeframe == 'today')) {
          weatherReport = 'Today in ' + city + ' you can expect maximal temperature of ' + weatherReportParsed.list[0].main.temp_max + degrees;
        } else {
          if(timeframe == 'tommorow') {
            weatherReport = 'Tommorow in ' + city + ' you can expect maximal temperature of ' + weatherReportParsed.list[1].main.temp_max + degrees;
          } else {
            weatherReport = 'Forecast for ' + city + ' is:';
            weatherReportParsed.list.forEach(function(item) {
              if(item) {
                if(weatherReport) {
                  if(weatherReport.indexOf(item.dt_txt.substring(0, item.dt_txt.indexOf(' '))) == -1) {
                    weatherReport = weatherReport + '\n\nOn ' + item.dt_txt + ' you can expect maximal temperature of ' + item.main.temp_max + degrees;
                  }
                } else {
                  weatherReport = 'On ' + item.dt_txt + ' you can expect maximal temperature of ' + item.main.temp_max + degrees;
                }
              }
            });

          }
        }
      }else {
        weatherReport = defaultAnswer;
      }
      
    }
    
  }
  
  return weatherReport;
}

module.exports = {
  hasWeather: hasWeather,
  getCityFromInput: getCityFromInput,
  checkForCity: checkForCity,
  getWeatherForCity: getWeatherForCity
};
