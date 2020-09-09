"use strict";

var fetch = require('node-fetch');

var request = require("request"); // You can find your project ID in your Dialogflow agent settings


var projectId = 'mikasa-e9mw'; //https://dialogflow.com/docs/agents#settings

var sessionId = '123456';
var languageCode = 'en-US';

var dialogflow = require('dialogflow');

var config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
};
var sessionClient = new dialogflow.SessionsClient(config);
var sessionPath = sessionClient.sessionPath(projectId, sessionId); // Remember the Page Access Token you got from Facebook earlier?
// Don't forget to add it to your `variables.env` file.

var sendMessage = function sendMessage(userId, message) {
  console.log(userId + ":" + message);
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: process.env.FACEBOOK_ACCESS_TOKEN
    },
    method: 'POST',
    json: {
      recipient: {
        id: userId
      },
      message: {
        text: message
      }
    }
  });
};

module.exports = function (event) {
  var userId = event.sender.id;
  var message = event.message.text;
  var request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode
      }
    }
  };
  sessionClient.detectIntent(request).then(function (responses) {
    var result = responses[0].queryResult || "I cannot reply you right now. I'm so sorry";
    return sendMessage(userId, result.fulfillmentText);
  })["catch"](function (err) {
    console.error('ERROR:', err);
  });
};