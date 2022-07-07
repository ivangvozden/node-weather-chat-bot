module.exports = (app) => {
  app.get('/privacy-policy', (req, res) => {
    res.sendFile(__dirname + '/privacy_policy.html');
  });
}
