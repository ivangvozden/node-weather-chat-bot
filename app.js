const { NlpManager } = require('node-nlp');
const express = require('express');
const body_parser = require('body-parser');

const trainnlp = require('./train-bot.js');
const routes = require('./routes')

const DEFAULT_PORT = 1337;

app = express()
app.use(body_parser.json());

// trains the NLP data model if one is not present
const nlpManager = new NlpManager({ languages: ['en'] });
trainnlp(nlpManager);

// registers all API routes
routes(app);

// Sets server port and logs message on success
app.listen(
  process.env.PORT || DEFAULT_PORT,
  () => console.log('🌤️⛅️🌥️🌧 Forecast bot started at ' + (process.env.PORT || DEFAULT_PORT) + " 🌤️⛅️🌥️🌧")
);
