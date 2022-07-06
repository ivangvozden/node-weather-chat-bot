const fs = require('fs');
const constants = require('./constants.js');

const botVersion = process.env.BOT_VERSION;

module.exports = function trainnlp(manager) {
  if (fs.existsSync('./model-' + botVersion + '.nlp')) {
    manager.load('./model-' + botVersion + '.nlp');
    return;
  }
  
  //Handle weather questions
  manager.addDocument('en', 'what\'s the weather like', constants.WEATHER_QUESTIONS);
  manager.addDocument('en', 'what\'s the forecast', constants.WEATHER_QUESTIONS);
  manager.addDocument('en', 'how\'s the weather', constants.WEATHER_QUESTIONS);
  
  //Handle weather answers - default answer
  manager.addAnswer('en', constants.WEATHER_QUESTIONS, 'Weather is great! Depending on where you are. What location are you interested in?');
  
  //Handle units of measurement questions - metric
  manager.addDocument('en', 'I prefer metric system', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I like metric system', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I prefer celsius', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I like celsius', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I prefer C', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I like C', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I prefer temperature in celsius', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I want reports in celsius', constants.METRIC_UNITS_OF_MEASUREMENT);
  
  //Handle units of measurement answers - metric
  manager.addAnswer('en', constants.METRIC_UNITS_OF_MEASUREMENT, 'I\'ll remember to send you reports in °C');
  
  //Handle units of measurement questions - imperial
  manager.addDocument('en', 'I prefer imperial system', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I like imperial system', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I prefer farenheit', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I like farenheit', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I prefer F', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I like F', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I prefer temperature in farenheit', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument('en', 'I want reports in farenheit', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  
  //Handle units of measurement answers - imperial
  manager.addAnswer('en', constants.IMPERIAL_UNITS_OF_MEASUREMENT, 'I\'ll remember to send you reports in °F');
  
  //Handle sea level questions
  manager.addDocument('en', 'what about sea levels', constants.SEA_LEVEL_QUESTIONS);
  manager.addDocument('en', 'how about sea levels', constants.SEA_LEVEL_QUESTIONS);
  manager.addDocument('en', 'what are the sea levels', constants.SEA_LEVEL_QUESTIONS);
  manager.addDocument('en', 'how is the sea level', constants.SEA_LEVEL_QUESTIONS);
  manager.addDocument('en', 'do you have a report about sea levels', constants.SEA_LEVEL_QUESTIONS);
  manager.addDocument('en', 'do you know about sea levels', constants.SEA_LEVEL_QUESTIONS);
  
  //Handle sea level answers - default
  manager.addAnswer('en', constants.SEA_LEVEL_QUESTIONS, 'I\'m sorry but I couldn\'t find a report for sea levels in your area.');
  
  //Handle ground level questions
  manager.addDocument('en', 'what about ground levels', constants.GROUND_LEVEL_QUESTIONS);
  manager.addDocument('en', 'how about ground levels', constants.GROUND_LEVEL_QUESTIONS);
  manager.addDocument('en', 'what are the ground levels', constants.GROUND_LEVEL_QUESTIONS);
  manager.addDocument('en', 'how is the ground level', constants.GROUND_LEVEL_QUESTIONS);
  manager.addDocument('en', 'do you have a report about ground levels', constants.GROUND_LEVEL_QUESTIONS);
  manager.addDocument('en', 'do you know about ground levels', constants.GROUND_LEVEL_QUESTIONS);
  
  //Handle ground level answers - default
  manager.addAnswer('en', constants.GROUND_LEVEL_QUESTIONS, 'I\'m sorry but I couldn\'t find a report for ground levels in your area.');
  
  //Handle humidity questions
  manager.addDocument('en', 'what about humidity', constants.HUMIDITY_QUESTIONS);
  manager.addDocument('en', 'how about humidity', constants.HUMIDITY_QUESTIONS);
  manager.addDocument('en', 'how is the humidity', constants.HUMIDITY_QUESTIONS);
  manager.addDocument('en', 'do you have a report about humidity', constants.HUMIDITY_QUESTIONS);
  manager.addDocument('en', 'do you know about humidity', constants.HUMIDITY_QUESTIONS);
  
  //Handle humidity answers - default
  manager.addAnswer('en', constants.HUMIDITY_QUESTIONS, 'I\'m sorry but I couldn\'t find a report for humidity in your area.');
  
  //Handle wind questions
  manager.addDocument('en', 'what about wind', constants.WIND_QUESTIONS);
  manager.addDocument('en', 'how about wind', constants.WIND_QUESTIONS);
  manager.addDocument('en', 'how is the wind', constants.WIND_QUESTIONS);
  manager.addDocument('en', 'do you have a report about wind', constants.WIND_QUESTIONS);
  manager.addDocument('en', 'do you know about wind', constants.WIND_QUESTIONS);
  
  //Handle wind answers - default
  manager.addAnswer('en', constants.WIND_QUESTIONS, 'I\'m sorry but I couldn\'t find a report for wind in your area.');
  
  //Handle rain questions
  manager.addDocument('en', 'what about rain', constants.RAIN_QUESTIONS);
  manager.addDocument('en', 'how about rain', constants.RAIN_QUESTIONS);
  manager.addDocument('en', 'is it raining', constants.RAIN_QUESTIONS);
  manager.addDocument('en', 'is it rainy', constants.RAIN_QUESTIONS);
  manager.addDocument('en', 'is there rain', constants.RAIN_QUESTIONS);
  manager.addDocument('en', 'do you have a report about rain', constants.RAIN_QUESTIONS);
  manager.addDocument('en', 'do you know about rain', constants.RAIN_QUESTIONS);
  
  //Handle rain answers - default
  manager.addAnswer('en', constants.RAIN_QUESTIONS, 'I\'m sorry but I couldn\'t find a report for rain in your area.');
  
  //Handle snow questions
  manager.addDocument('en', 'what about snow', constants.SNOW_QUESTIONS);
  manager.addDocument('en', 'how about snow', constants.SNOW_QUESTIONS);
  manager.addDocument('en', 'is it snowing', constants.SNOW_QUESTIONS);
  manager.addDocument('en', 'is it snowy', constants.SNOW_QUESTIONS);
  manager.addDocument('en', 'is there snow', constants.SNOW_QUESTIONS);
  manager.addDocument('en', 'do you have a report about snow', constants.SNOW_QUESTIONS);
  manager.addDocument('en', 'do you know about snow', constants.SNOW_QUESTIONS);
  
  //Handle snow answers - default
  manager.addAnswer('en', constants.SNOW_QUESTIONS, 'I\'m sorry but I couldn\'t find a report for snow in your area.');
  
  //Handle temperature questions
  manager.addDocument('en', 'what about temperature', constants.TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'how about temperature', constants.TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'how is the temperature', constants.TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'do you have a report about temperature', constants.TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'do you know about temperature', constants.TEMPERATURE_QUESTIONS);
  
  //Handle temperature answers - default
  manager.addAnswer('en', constants.TEMPERATURE_QUESTIONS, 'I\'m sorry but I couldn\'t find a report for temperature in your area.');
  
  //Handle min temperature questions
  manager.addDocument('en', 'what about minimal temperature', constants.MINIMAL_TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'how about minimal temperature', constants.MINIMAL_TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'how is the minimal temperature', constants.MINIMAL_TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'do you have a report about minimal temperature', constants.MINIMAL_TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'do you know about minimal temperature', constants.MINIMAL_TEMPERATURE_QUESTIONS);
  
  //Handle min temperature answers - default
  manager.addAnswer('en', constants.MINIMAL_TEMPERATURE_QUESTIONS, 'I\'m sorry but I couldn\'t find a report for minimal temperature in your area.');
  
  //Handle max temperature questions
  manager.addDocument('en', 'what about maximum temperature', constants.MAXIMUM_TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'how about maximum temperature', constants.MAXIMUM_TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'how is the maximum temperature', constants.MAXIMUM_TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'do you have a report about maximum temperature', constants.MAXIMUM_TEMPERATURE_QUESTIONS);
  manager.addDocument('en', 'do you know about maximum temperature', constants.MAXIMUM_TEMPERATURE_QUESTIONS);
  
  //Handle max temperature answers - default
  manager.addAnswer('en', constants.MAXIMUM_TEMPERATURE_QUESTIONS, 'I\'m sorry but I couldn\'t find a report for maximum temperature in your area.');
  
  //Handle small talk
  manager.addDocument('en', 'how are you', constants.HOW_ARE_YOU_QUESTIONS);
  manager.addDocument('en', 'how\'s it going', constants.HOW_ARE_YOU_QUESTIONS);
  manager.addDocument('en', 'how have you been', constants.HOW_ARE_YOU_QUESTIONS);
  manager.addDocument('en', 'how you\'ve been', constants.HOW_ARE_YOU_QUESTIONS);
  manager.addDocument('en', 'what\'s up', constants.WHATS_UP_QUESTIONS);
  manager.addDocument('en', 'good', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument('en', 'i\m doing great', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument('en', 'okay', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument('en', 'fine', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument('en', 'excellent', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument('en', 'fantastic', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument('en', 'not good', constants.HOW_ARE_YOU_NEGATIVE_ANSWERS);
  manager.addDocument('en', 'not okay', constants.HOW_ARE_YOU_NEGATIVE_ANSWERS);
  manager.addDocument('en', 'not fine', constants.HOW_ARE_YOU_NEGATIVE_ANSWERS);
  manager.addDocument('en', 'bad', constants.HOW_ARE_YOU_NEGATIVE_ANSWERS);
  
  //Handle answers for small talk
  manager.addAnswer('en', constants.HOW_ARE_YOU_QUESTIONS, 'I am little under the weather. You?');
  manager.addAnswer('en', constants.HOW_ARE_YOU_POSITIVE_ANSWERS, 'That\'s great! What can I help you with?');
  manager.addAnswer('en', constants.HOW_ARE_YOU_NEGATIVE_ANSWERS, 'I\'m sorry to hear that. Is there anyway I can help you?');
  manager.addAnswer('en', constants.WHATS_UP_QUESTIONS, 'Oh nothing much. Just doing a little weather forecasting. You?');
  
  //Handle help questions
  manager.addDocument('en', 'can you help me', constants.HELP_QUESTIONS);
  manager.addDocument('en', 'need help', constants.HELP_QUESTIONS);
  
  //Handle help answers
  manager.addAnswer('en', constants.HELP_QUESTIONS, 'I can help you with weather forecast. For other things you have to find someone smarter.');
 
  //Handle greetings
  manager.addDocument('en', 'hello', constants.GREETINGS);
  manager.addDocument('en', 'hi', constants.GREETINGS);
  manager.addDocument('en', 'hey', constants.GREETINGS);
  manager.addDocument('en', 'howdy', constants.GREETINGS);
  
  //Handle answers for greetings
  manager.addAnswer('en', constants.GREETINGS, 'Hey there!');
  manager.addAnswer('en', constants.GREETINGS, 'Hi!');
  
  //Handle farewells
  manager.addDocument('en', 'goodbye', constants.FAREWELLS);
  manager.addDocument('en', 'bye', constants.FAREWELLS);
  manager.addDocument('en', 'see you later', constants.FAREWELLS);
  manager.addDocument('en', 'i must go', constants.FAREWELLS);

  //Handle answers for farewells
  manager.addAnswer('en', constants.FAREWELLS, 'Until next time!');
  manager.addAnswer('en', constants.FAREWELLS, 'See you soon!');
  manager.addAnswer('en', constants.FAREWELLS, 'Catch you later!');
  
  // Train and save the model.
  manager.train();
  manager.save('./model-' + botVersion + '.nlp');
  
  console.log('trained');
  
};