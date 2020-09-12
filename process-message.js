const fetch = require('node-fetch');
var request = require("request");
// You can find your project ID in your Dialogflow agent settings
const projectId = 'mikasa-bgjr'; //https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');

const config = {
    credentials: {
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDGUfEugJS6h9nU\ng0iMdojBR5YAAdX6ZQDch84c8tbRzac9FOskw01WRNXekqINEsjl9hNna0tbP57F\ne5hFYbGXEjzhcC/nYDlnexXEl+oPqWkziPYwilHlvcsbcnWpxVTWLkkS9eN+1iHs\nD90FYT1XMRWyvMHAeAJ7VvTpUZwouqLYpv8MKKjHPujMjmpRD8RfKPPy7ISHdJ/f\nHo+0PWampgwyEj4LWGE+tweJ8175qIZENLh+rQLEfRo+u+q3QC0QeCxvfANy0Csp\nXwshFeHIXKSHOmVs89vRAfEmpQopWxBDnPpwHZqHzv9HeMb2GPcWsRzhw8/hYUew\nhCUgqBTVAgMBAAECggEAAvS6tw+PPUkuwSukcQTdR0rlXKJVCafoFOFopubPC+PY\nVSE9hgKWjFgh+0YikzZPTJotMjKXth2jJLIRvsr/e3nNSCuaEy/3Jb3ga687UQ4c\nis+aTSE//5V4ybPG4YfBmsr9fNexvd9m3wliKSUzZbF4xNK/wo98s1Du/UFMULu8\nqWL+L1Kfu0wGICBALwu4MXlu89Z+c0i/2ZQ6wR8zx4zi9IsxMUFW8yEbI2wqZ/XZ\nZ4xKmx+FQ+4TRtK7AeckmFmocrNl+DgTj9AlO1CA1IziNe9q2GrWWKxw0nNIIydQ\n7pUU4nZDGkFy4ZlOGbOEA9glwS09rO9jhz4uRnGS2wKBgQD9MwZC/P3v6ejfCcab\nQ727IJrsfRNCVL899U0C070qqvCT0DyxxnxwdF2LgPN2dcif/3Rn9xFzXcKLERaB\nYPZeU6+Z7PRX3mHxhDeXkuWWb0YPGvw+mZtsSNCXGX8odl+AJDpfTmSIMwveK0Ax\nEPlgIv1c7H0B1zTzEofeqY2jzwKBgQDIg4Sha4KAc99tcJD0aCdMrUpYt/313Mi9\nmI4925OcGOLk/D4u/EHJ9+REuwqF/KqPSa3is1clJPJp50cykqgF0WCKB5JIfHBh\nEniM/KJB5j6zFZg7DGKsuQma/HqusxUMgIXRzk1X6AhpTGSxPHM4mWtvl4soJWln\nGjI2qijSGwKBgAdnAnva4aGt+PzsUD4h0N4zqdPYJEQALkclcMbwYctpi/cGU3/v\nCZxQCpwVfQitkNv8n+6aLoxs5U8jhMDrkMhZMf0SDGK1Qa/J6cYoqUWooye15kH+\nQ6j6x/5i5HDOZSRd6sb2h8HjnCk2on3MvT2uSDH7R/xRyl6A4DAGTPnJAoGAWjnk\nCobIGGkLlsFaWMAtPvGTTMyuOF367mWhS/BsQYdpQcTHbnkQWYN0cgEAQT5quUNc\nPXCZvBseAc2SWg1oEgYfPL0fdAKaxvN6z2Y21RR4DjmfYKK4HCS/T8BgrA/lXtTO\nYpREdVPxxQAdJyueZU+T6oj0k0ISZdSB19tFtxUCgYAcnK/LTSzmdtjtp13q6FtY\n/WNkR38BBN8CjfzWgs9qQ1/2w9evb+pINFm3q7Vkh83L3gWMxmCXBGJPiqzPK8T3\nZntPoPt5lksOHqRNiUOJ/nnsZd9FwAbrkKjlKfaHGtkht6t8gsWcJkRaQJ7gp4Nw\n9Tmskt2dUf2oi2OOuctT9A==\n-----END PRIVATE KEY-----\n",
        client_email: "dialogflow-efrblb@mikasa-bgjr.iam.gserviceaccount.com"
    }
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Remember the Page Access Token you got from Facebook earlier?
// Don't forget to add it to your `variables.env` file.
const sendMessage = (userId, message) => {
    console.log(userId + ":" + message);
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: "EAAJUPFUQ9b4BALE9lZBrmZCSUlHudRxibZBJ2nqxSPZCSrtrr094QJZAiKPP4ZCKUrDBX4oHNgm34ACNWzi3nIFZABT11fWaFFT5mOna7GQtmFz7P8jhFLSAZCcvc2AyvcdGD1lCJlrqDKhZCeyM40fYrWN9cyHHoOSLugynuQYDdf0VXw3f2L6ZCj",
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