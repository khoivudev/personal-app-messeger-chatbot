const fetch = require('node-fetch');
var request = require("request");
// You can find your project ID in your Dialogflow agent settings
const projectId = 'mikasa-e9mw'; //https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');

const config = {
    credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
            //private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDwZhg4QtAR/7W+\naUz/yI123VmOYLwb9h0nYg+kROfL29rY2JCcIP+uVmHGSh6cJFC63NoKp6YpEOxz\nHjBS3QXZLH7RC63txggUUU2OWUPOoVSug6b3XyFvMt+KtUrLx3JQE9nryxwcGH40\n9gIFVOFf/k2NXMRIZHOJBM6AkjS54VjFAfoH2eOOGlvh/fxCrSmR1gcU9KTePy4X\nfMErHAn+RAj/A0KbGhO4Kxiobxx10mxRkIVdmi9J/2eWmvCVz7AU5BicEpHcorV3\nuYg5dqM/+aqcBtMSXDUWKBp93W7PPHsd6QpMgWcyuzuydqZT/VJkhzVZd7eBramN\nrJBl1U6bAgMBAAECggEACQxOrQ9sCsFicyA+KFfBZfqUJv+3v3Wr8zza9IaDaEYw\nySidiMLVMhfzkNBesTx3WBEn7m67mkrAxjRvV9m/IUVuIIAdXm2tsCtp4om0O6Vm\n1+AB+3LhLJua6PrvLcGmqSJAztco37CBpOH9gXszCwyPRAV8fce0xtt0ykdhJKh7\n+iUSjsllLxj3z721h3dYHO7uxr/4AfAdQfylG5oBI837Tkd6ChWIqZIb6CTMXwXE\n4iSTQIn4Vktqj/37rr55joXdhjl4OLTdgv/Jst+X0dNU4C0ZnNn595T0y2bHwVf0\nkLKzNalgaAS1XwnxwbUP3QNOTOoMlpnR72vPN17PgQKBgQD5SBSj8/dtrC9ouBqn\nEFwekJm7nso6w0SENBjrqODGjdZcwHJGBos6LLIojCA0CTIB2F+jsteu+XR/7YWM\nuV2QeK6m3+HSyALoCrTHJ3TSOKFo+r+RyqhnqzJ1aw2W4FyGxZCa9JmzhuNu/4+G\nn4+IiVcvODwzv9WyspD+DASygwKBgQD24LozotWYJjEVIZDdp26zGxKsSkqlr9yU\novwk6Y3MYmetL5wGGtROtLLD31k7m7rbH17RFZlzR5LXiBfGuedv54vtBVvOE4r0\nL5UCqYkl2IXHfjOyRWR+7xWSN4a6lYMuZW3kppTgFZYz0SPtgnVf63bOepawP2Eu\nFBOv6RpYCQKBgQD04Hz+LfuibeHIkgoEkUqc79lE+JCaNxXIdNECNsxP4Cdyx825\nwlXkmOGOeVBtLZdFPsN8sIO1q/FodfCaM8GY2SRgY0+X2skYHuRFOxpEJENTN/cW\nBal25TLVK4uW6eGattr9jUirldc3Q68/ROEf9CKEDU7+WvVW7JkIJtA6dwKBgAK1\nXnWYkL1Vle5EawFzh8xhPKg1PHJq5oGe9CM3iL24Sqjkv9J1UuT2KIvrlGAKClfD\nFVg343IXU+4XaSNeAMMCiE92YpZ1Mm4RY5Ie6AlJQdZ5dPm8tyiJWPQ8tbawUzsc\nE8ORbEq1EevJnJpLdxwxSiFjyOlwGJHX2ItyhD55AoGAbuov9ckvYuGfa7e+Pkq0\ns56IgaaEzlnUl7jO2KTqrCGhypnCp5DZCL/eCs96gArRXWTqQZvAJ99YAj6/91cl\neKRt0OD1oqbAamPus+nEPpXIJGRGgBEuTkDMNgHfVQKzT3dDXf8rr9R2q20jyX2r\n3GGoDIrQjadHAbq6EKVLRv4=\n-----END PRIVATE KEY-----\n",
            //client_email: "dialogflow-retsnr@mikasa-e9mw.iam.gserviceaccount.com"
    }
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Remember the Page Access Token you got from Facebook earlier?
// Don't forget to add it to your `variables.env` file.
const { FACEBOOK_ACCESS_TOKEN } = process.env;

const sendMessage = (userId, message) => {
    console.log(userId + ":" + message);
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: FACEBOOK_ACCESS_TOKEN,
        },
        method: 'POST',
        json: {
            recipient: {
                id: userId
            },
            message: {
                text: message
            },
        }
    });
}

module.exports = (event) => {
    const userId = event.sender.id;
    const message = event.message.text;

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
    };

    sessionClient
        .detectIntent(request)
        .then(responses => {
            const result = responses[0].queryResult || "I cannot reply you right now. I'm so sorry";
            return sendMessage(userId, result.fulfillmentText);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}