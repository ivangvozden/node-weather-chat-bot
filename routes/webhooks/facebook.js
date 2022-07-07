const handleMessage = require('../../methods/handleMessage');
const sendResponse = require('./sendResponse');

// Handles messaging_postbacks events
function handlePostback(received_postback, sender_psid) {
  console.log(received_postback, sender_psid);
}

module.exports = (app) => {
  
  // Accepts GET requests at the /webhook endpoint for verification
  app.get('/facebook/webhook', (req, res) => {
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
  
  // Accepts POST requests at /webhook endpoint for receiving data
  app.post('/facebook/webhook', (req, res) => {  
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {
      body.entry.forEach(function(entry) {
        // Gets the body of the webhook event
        let webhook_event = entry.messaging[0];

        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message) {
          sendResponse(
            handleMessage(webhook_event.message, sender_psid),
            sender_psid
          );        
        } else if (webhook_event.postback) {
          handlePostback(webhook_event.postback, sender_psid);
        }
      });

      // Return a '200 OK' response to all events
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }

  });
  
}
