# Weather forecast chat bot

Welcome to weather forecasting bot that will tell you the forecast of the location you ask it to!

***
**IMPORTANT:** project is still in development
***

## ENV variables

For bot to function properly you need to set the following:

- **GOOGLE_API_KEY** used for querying Google Maps Autocomplete API

- **OPENWEATHER_APPID** used for retrieving weather forecast from OpenWeather API

Optional vars are:

- **PORT** used to overrride default port to host the app on

- **BOT_VERSION** for versioning the NLP model data, used for training new model data on every iteration

- **FACEBOOK_PAGE_ACCESS_TOKEN** used for connecting to Facebook webhook if you're using it as a Messenger bot

***

## Natural language processor

To better parse received messages and predict answers, chatbot uses a *Natural language processor* (**NLP**) that helps it handle variety of messages. These include small talk, greetings, farewells and other types of messages. Through NLP, bot can keep his conversations fluent as much as possible. It also implements a positive/negative paradigm of recieved messages so it can act differently depending on the context of a received message.

If the message recieved isn't classified as a weather question, bot responds with pretrained answers. If the message recieved is classified as a weather related question, bot applies additional logic and checks for location in the message. 

Because of the time needed to train bot for NLP, bot is trained after each version iteration and saved to 'model.nlp' file. This way if a model is already trained and saved, it will load from a file instead of training it again. 

***

## Conversation tracking

Bot implements a simple system of conversation tracking by saving information on previous messages. 

Information stored includes:

- prefered unit of measurement
- last location that a report has been requested for and last message that was sent to the user (Storing this data helps bot keep sense of a conversation. For example, when bot asks user for his location it will know the next message should be name of a location that a user wants and it will search Places API for his response).

***

## Weather reports

Bot handles wide variety of questions regarding weather forecasting. It also takes into consideration what timeframe did user request. Supported keywords for timeframes are 'today', 'tommorow' and 'this week'. If a timeframe wasn't specified it will default to today. User can request different information regarding weather but if that information isn't specified it will default to minimum and maximum temperature report. All supported reports are:

### Units of measurement
When user says which system they prefer, bot will respond accordingly and store information on users prefered system. When bot is asked about temperature or weather it will respond with degrees in celsius or farenheit, depending on above mentioned preference. Supported systems are metric and imperial.


### Temperature
When asked about temperature, bot will respond with minimum and maximum temperature for requested time period.

### Minimum temperature
When asked specifically about minimum temperature, bot will respond with minimum temperature for requested time period.

### Maximum temprature
When asked specifically about maximum temperature, bot will respond with minimum temperature for requested time period.

### Sea level
When asked about sea levels, bot will respond with information regarding atmospheric pressure on the sea level in hPa for requested time period.

### Ground level
When asked about ground levels, bot will respond with information regarding atmospheric pressure on the ground level in hPa for requested time period.

### Humidity
When asked about humidity, bot will respond with percentage of humidity for requested time period.

### Wind
When asked about wind, bot will respond with wind speed and wind direction for requested time period. Wind speed is represented in meter/sec for metric system and miles/hour for imperial system.

### Rain
When asked about rain, bot will respond with rain volume in mm for last 3 hours.

### Snow
When asked about rain, bot will respond with snow volume for last 3 hours.

***

## Integrations

### Facebook Messenger
Web service exposes the webhook for receiving messages on '/webhook' endpoint and responds to messages recieved depending on it's content.
 
### Google Places API
Messages that are received from Facebook are parsed based on certain location predictions. This way, only the part of message relevant to location is extracted. When location is successfully retrieved from a message, it's value is used to search through cities available on Google Places API. Predictions recieved from Places API usually contain more detailed description of a location name so these predictions are used in the following forecast request. Ex: if user asks 'How is the weather in Beverly Hills?', words 'Beverly Hills' are searched in Places API and first returning prediction is 'Beverly Hills, CA, USA'. Next step is to get a weather report from OpenWeatherAPI with the prediciton recieved from Google.
 
### OpenWeatherMap API
After parsing initial message and checking for the requested location in Places API, a weather report is requested from OpenWeatherAPI. Bot also checks for timeframe requested so if a user asks how is the weather today, tommorow or this week it will respond accordingly. If a timeframe isn't specified, forecast for today is returned. If forecast for specified timeframe isn't available, bot will return a message that will indicate that to user.

***

## Dependencies

Full list coming soon!
