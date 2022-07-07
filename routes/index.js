const webhooks = require('./webhooks');
const privacyPolicy = require('./privacyPolicy');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/README.md');
  });
  
  webhooks(app);
  privacyPolicy(app);
}
