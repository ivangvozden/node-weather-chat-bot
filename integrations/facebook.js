const syncRequest = require("sync-request");

module.exports = {
  sendMessage: (response, sender_psid) => {
    // Construct the message body
    let request_body = {
      "recipient": { "id": sender_psid },
      "message": response
    }

    // Send the HTTP request to the Messenger Platform
    syncRequest({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    });
  }
}
