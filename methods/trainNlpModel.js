const fs = require('fs');
const constants = require('./constants.js');

module.exports = function trainNlpModel(manager) {
  const nlpDir = "/nlp"
  
  if(!fs.existsSync(nlpDir)) {
    fs.mkdirSync(nlpDir);
  }
  
  if (fs.existsSync(nlpDir + '/model-' + process.env.BOT_VERSION + '.nlp')) {
    manager.load(nlpDir + '/model-' + process.env.BOT_VERSION + '.nlp');
    return;
  }
  
  const locale = "en";
  
  //Handle weather questions
  manager.addDocument(locale, 'what\'s the weather like', constants.WEATHER_QUESTIONS);
  manager.addDocument(locale, 'what\'s the forecast', constants.WEATHER_QUESTIONS);
  manager.addDocument(locale, 'how\'s the weather', constants.WEATHER_QUESTIONS);
  
  //Handle weather answers - default answer
  manager.addAnswer(
    locale, constants.WEATHER_QUESTIONS,
    'Weather is great! Depending on where you are. What location are you interested in?'
  );
  
  //Handle units of measurement questions - metric
  manager.addDocument(locale, 'I prefer metric system', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I like metric system', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I prefer celsius', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I like celsius', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I prefer C', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I like C', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I prefer temperature in celsius', constants.METRIC_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I want reports in celsius', constants.METRIC_UNITS_OF_MEASUREMENT);
  
  //Handle units of measurement answers - metric
  manager.addAnswer(
    locale, constants.METRIC_UNITS_OF_MEASUREMENT,
    'I\'ll remember to send you reports in °C'
  );
  
  //Handle units of measurement questions - imperial
  manager.addDocument(locale, 'I prefer imperial system', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I like imperial system', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I prefer farenheit', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I like farenheit', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I prefer F', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I like F', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I prefer temperature in farenheit', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  manager.addDocument(locale, 'I want reports in farenheit', constants.IMPERIAL_UNITS_OF_MEASUREMENT);
  
  //Handle units of measurement answers - imperial
  manager.addAnswer(
    locale, constants.IMPERIAL_UNITS_OF_MEASUREMENT,
    'I\'ll remember to send you reports in °F'
  );
  
  //Handle sea level questions
  manager.addDocument(locale, 'what about sea levels', constants.SEA_LEVEL_QUESTIONS);
  manager.addDocument(locale, 'how about sea levels', constants.SEA_LEVEL_QUESTIONS);
  manager.addDocument(locale, 'what are the sea levels', constants.SEA_LEVEL_QUESTIONS);
  manager.addDocument(locale, 'how is the sea level', constants.SEA_LEVEL_QUESTIONS);
  manager.addDocument(locale, 'do you have a report about sea levels', constants.SEA_LEVEL_QUESTIONS);
  manager.addDocument(locale, 'do you know about sea levels', constants.SEA_LEVEL_QUESTIONS);
  
  //Handle sea level answers - default
  manager.addAnswer(
    locale, constants.SEA_LEVEL_QUESTIONS,
    'I\'m sorry but I couldn\'t find a report for sea levels in your area.'
  );
  
  //Handle ground level questions
  manager.addDocument(locale, 'what about ground levels', constants.GROUND_LEVEL_QUESTIONS);
  manager.addDocument(locale, 'how about ground levels', constants.GROUND_LEVEL_QUESTIONS);
  manager.addDocument(locale, 'what are the ground levels', constants.GROUND_LEVEL_QUESTIONS);
  manager.addDocument(locale, 'how is the ground level', constants.GROUND_LEVEL_QUESTIONS);
  manager.addDocument(locale, 'do you have a report about ground levels', constants.GROUND_LEVEL_QUESTIONS);
  manager.addDocument(locale, 'do you know about ground levels', constants.GROUND_LEVEL_QUESTIONS);
  
  //Handle ground level answers - default
  manager.addAnswer(
    locale, constants.GROUND_LEVEL_QUESTIONS,
    'I\'m sorry but I couldn\'t find a report for ground levels in your area.'
  );
  
  //Handle humidity questions
  manager.addDocument(locale, 'what about humidity', constants.HUMIDITY_QUESTIONS);
  manager.addDocument(locale, 'how about humidity', constants.HUMIDITY_QUESTIONS);
  manager.addDocument(locale, 'how is the humidity', constants.HUMIDITY_QUESTIONS);
  manager.addDocument(locale, 'do you have a report about humidity', constants.HUMIDITY_QUESTIONS);
  manager.addDocument(locale, 'do you know about humidity', constants.HUMIDITY_QUESTIONS);
  
  //Handle humidity answers - default
  manager.addAnswer(
    locale, constants.HUMIDITY_QUESTIONS,
    'I\'m sorry but I couldn\'t find a report for humidity in your area.'
  );
  
  //Handle wind questions
  manager.addDocument(locale, 'what about wind', constants.WIND_QUESTIONS);
  manager.addDocument(locale, 'how about wind', constants.WIND_QUESTIONS);
  manager.addDocument(locale, 'how is the wind', constants.WIND_QUESTIONS);
  manager.addDocument(locale, 'do you have a report about wind', constants.WIND_QUESTIONS);
  manager.addDocument(locale, 'do you know about wind', constants.WIND_QUESTIONS);
  
  //Handle wind answers - default
  manager.addAnswer(
    locale, constants.WIND_QUESTIONS,
    'I\'m sorry but I couldn\'t find a report for wind in your area.'
  );
  
  //Handle rain questions
  manager.addDocument(locale, 'what about rain', constants.RAIN_QUESTIONS);
  manager.addDocument(locale, 'how about rain', constants.RAIN_QUESTIONS);
  manager.addDocument(locale, 'is it raining', constants.RAIN_QUESTIONS);
  manager.addDocument(locale, 'is it rainy', constants.RAIN_QUESTIONS);
  manager.addDocument(locale, 'is there rain', constants.RAIN_QUESTIONS);
  manager.addDocument(locale, 'do you have a report about rain', constants.RAIN_QUESTIONS);
  manager.addDocument(locale, 'do you know about rain', constants.RAIN_QUESTIONS);
  
  //Handle rain answers - default
  manager.addAnswer(
    locale, constants.RAIN_QUESTIONS,
    'I\'m sorry but I couldn\'t find a report for rain in your area.'
  );
  
  //Handle snow questions
  manager.addDocument(locale, 'what about snow', constants.SNOW_QUESTIONS);
  manager.addDocument(locale, 'how about snow', constants.SNOW_QUESTIONS);
  manager.addDocument(locale, 'is it snowing', constants.SNOW_QUESTIONS);
  manager.addDocument(locale, 'is it snowy', constants.SNOW_QUESTIONS);
  manager.addDocument(locale, 'is there snow', constants.SNOW_QUESTIONS);
  manager.addDocument(locale, 'do you have a report about snow', constants.SNOW_QUESTIONS);
  manager.addDocument(locale, 'do you know about snow', constants.SNOW_QUESTIONS);
  
  //Handle snow answers - default
  manager.addAnswer(
    locale, constants.SNOW_QUESTIONS,
    'I\'m sorry but I couldn\'t find a report for snow in your area.'
  );
  
  //Handle temperature questions
  manager.addDocument(locale, 'what about temperature', constants.TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'how about temperature', constants.TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'how is the temperature', constants.TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'do you have a report about temperature', constants.TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'do you know about temperature', constants.TEMPERATURE_QUESTIONS);
  
  //Handle temperature answers - default
  manager.addAnswer(
    locale, constants.TEMPERATURE_QUESTIONS,
    'I\'m sorry but I couldn\'t find a report for temperature in your area.'
  );
  
  //Handle min temperature questions
  manager.addDocument(locale, 'what about minimal temperature', constants.MINIMAL_TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'how about minimal temperature', constants.MINIMAL_TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'how is the minimal temperature', constants.MINIMAL_TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'do you have a report about minimal temperature', constants.MINIMAL_TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'do you know about minimal temperature', constants.MINIMAL_TEMPERATURE_QUESTIONS);
  
  //Handle min temperature answers - default
  manager.addAnswer(
    locale, constants.MINIMAL_TEMPERATURE_QUESTIONS,
    'I\'m sorry but I couldn\'t find a report for minimal temperature in your area.'
  );
  
  //Handle max temperature questions
  manager.addDocument(locale, 'what about maximum temperature', constants.MAXIMUM_TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'how about maximum temperature', constants.MAXIMUM_TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'how is the maximum temperature', constants.MAXIMUM_TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'do you have a report about maximum temperature', constants.MAXIMUM_TEMPERATURE_QUESTIONS);
  manager.addDocument(locale, 'do you know about maximum temperature', constants.MAXIMUM_TEMPERATURE_QUESTIONS);
  
  //Handle max temperature answers - default
  manager.addAnswer(
    locale, constants.MAXIMUM_TEMPERATURE_QUESTIONS,
    'I\'m sorry but I couldn\'t find a report for maximum temperature in your area.'
  );
  
  //Handle small talk
  manager.addDocument(locale, 'how are you', constants.HOW_ARE_YOU_QUESTIONS);
  manager.addDocument(locale, 'how\'s it going', constants.HOW_ARE_YOU_QUESTIONS);
  manager.addDocument(locale, 'how have you been', constants.HOW_ARE_YOU_QUESTIONS);
  manager.addDocument(locale, 'how you\'ve been', constants.HOW_ARE_YOU_QUESTIONS);
  manager.addDocument(locale, 'what\'s up', constants.WHATS_UP_QUESTIONS);
  manager.addDocument(locale, 'good', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument(locale, 'i\m doing great', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument(locale, 'okay', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument(locale, 'fine', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument(locale, 'excellent', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument(locale, 'fantastic', constants.HOW_ARE_YOU_POSITIVE_ANSWERS);
  manager.addDocument(locale, 'not good', constants.HOW_ARE_YOU_NEGATIVE_ANSWERS);
  manager.addDocument(locale, 'not okay', constants.HOW_ARE_YOU_NEGATIVE_ANSWERS);
  manager.addDocument(locale, 'not fine', constants.HOW_ARE_YOU_NEGATIVE_ANSWERS);
  manager.addDocument(locale, 'bad', constants.HOW_ARE_YOU_NEGATIVE_ANSWERS);
  
  //Handle answers for small talk
  manager.addAnswer(locale, constants.HOW_ARE_YOU_QUESTIONS, 'I am little under the weather. You?');
  manager.addAnswer(locale, constants.HOW_ARE_YOU_POSITIVE_ANSWERS, 'That\'s great! What can I help you with?');
  manager.addAnswer(locale, constants.HOW_ARE_YOU_NEGATIVE_ANSWERS, 'I\'m sorry to hear that. Is there anyway I can help you?');
  manager.addAnswer(locale, constants.WHATS_UP_QUESTIONS, 'Oh nothing much. Just doing a little weather forecasting. You?');
  
  //Handle help questions
  manager.addDocument(locale, 'can you help me', constants.HELP_QUESTIONS);
  manager.addDocument(locale, 'need help', constants.HELP_QUESTIONS);
  
  //Handle help answers
  manager.addAnswer(locale, constants.HELP_QUESTIONS, 'I can help you with weather forecast. For other things you have to find someone smarter.');
 
  //Handle greetings
  manager.addDocument(locale, 'hello', constants.GREETINGS);
  manager.addDocument(locale, 'hi', constants.GREETINGS);
  manager.addDocument(locale, 'hey', constants.GREETINGS);
  manager.addDocument(locale, 'howdy', constants.GREETINGS);
  
  //Handle answers for greetings
  manager.addAnswer(locale, constants.GREETINGS, 'Hey there!');
  manager.addAnswer(locale, constants.GREETINGS, 'Hi!');
  
  //Handle farewells
  manager.addDocument(locale, 'goodbye', constants.FAREWELLS);
  manager.addDocument(locale, 'bye', constants.FAREWELLS);
  manager.addDocument(locale, 'see you later', constants.FAREWELLS);
  manager.addDocument(locale, 'i must go', constants.FAREWELLS);

  //Handle answers for farewells
  manager.addAnswer(locale, constants.FAREWELLS, 'Until next time!');
  manager.addAnswer(locale, constants.FAREWELLS, 'See you soon!');
  manager.addAnswer(locale, constants.FAREWELLS, 'Catch you later!');
  
  // Train and save the model.
  manager.train();
  manager.save('../nlp/modelData.nlp');
};
