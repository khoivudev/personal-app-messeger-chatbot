const fetch = require('node-fetch');
var request = require("request");
// You can find your project ID in your Dialogflow agent settings
const projectId = 'test-9mnk'; //https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');

const config = {
    credentials: {
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCKxoHZoE093xWj\nJy6rJRqZ5FdY4IlBXFSzoPauIaO+1xzRx9MuJvW6GTnGDiRHSOR6ya7O8DTZ6Una\n1LzLG6vC0Lh0waJ1321wdklD/pTYSm1f8jlRnu2OEwMUrTMcwbbB6YowKusK/Em3\np/jcl/UuvMwcB3cscVzhVrnpIa5CUDVQwNzfpPPnQ+lTit4kH+2HEDh71p0MRns6\n77Ty3IOXg2jHMC7gTIVM+RW4CZxWBhIpoXZ6jTkBtz2SnO1JJslfIHTm4bopDtYx\nZEwP6/7a0ZzOWN32U6ZAp9BW56C5XvRVn+muWQ2SpcpdqHOnsYaMsKOLWtB46Qbl\nn0Jh5BbjAgMBAAECggEAQjfBSv4uDTlPAkhWgOyV+luWAD83zxvHAOVr/5/mmc/c\nHQ976ZhGhVO3GRWzYt5Zw2tMActldJtYFdaP9VyRQ0bD1VZ19kez2Udf41VtYZ11\n/iO/DP7IPJQ+0pVof67BTVrqCNzZxaanaD56xYuuvuvweulnCKpZFt8Cm8bp9xLJ\n1XYpIcyAqI0LEqQWdYfU18sfE3awVkOPW7HjmOYmm9IeUcbVCKzA+7p7ttI0WL4Z\nvcqVx3UxChyo+yBdPCaNFFoYrZ1fxDFDbs6wc98iM/H5xC58sYkZpdpWaThFGjOB\nf8SOALq4BtopDhaVZZVanQ5beZQAPNHILXnRX3oZIQKBgQC8nzoUT1joX9FqsRVO\nkwt2VYXQxqzBKX4hdKtrCqAZL2lfIPCEPOCvK76xjN6n9/PIcvH8/4JNg9JT4/pn\n617asfVq+YIPbTCqRePmKpXKpZCz6SZ7C1cLWgmUGNtKL9v6vq1klmPLhPbeJzDJ\nzZjl2xQMJ8RtpFJ8mkXJr9QsQwKBgQC8WP/JDywgcd/gNNeqWPKevrPbnAy2hxvB\nqVegaQBeW0ahvJJZtTdOrJjg+boVaYQzjdMZ3Q7rQHuGXOD8+R+HVzjbbD/r0awI\newYh63rai9KrnnoQK4BIA6azs5QRyMAb7u0BEMwYSTihZUBbQ/oEa73EMH8cEJka\nQffMC/cQ4QKBgQCfqZytInlcwfbvfBRQHbJfKYeLMRF8tJW61hpgEm9wwixMxQIy\nvaFnRf02J8s1nXJzI7Fo+hOfb80zC9Cj9J2nO2pFcgzA6CmAiIagBz4iekFhuSLE\nltXImx9uiBff1WE8//igI5k35kZdyAjJWcpqDycKHwNr1+Om66PVVIuiJwKBgFPX\nNj1U4KqspiCSxTHSGGYrs7pdU5douyVQ8W25b+2QqfdTDr6aGT2PPRpgb8IaTzv3\ntPG9Yme8M4BTFd/mMW+4ltmt7SJXGkJIKSmuPejM9wFoMSPDiX4FCg7SMGZeO43z\npFKmHIPvDCNkA+rcbo3LPBT6FYrzpIN4vAp7hQZhAoGAH/jMSWpZGtr6wuiZFttc\nP0HtEBhvguavTvsnmYIMeyHRspMq5p0XR0N58p++RwTzKbyfg6dPzyMmGxS5MajM\nKCMnmOX16zf+Or8ndLZ5MnnV6nQ3HCKlZ5TrskapuLgX6trw1ZsUlCDb9rg+RmGs\n1wnfK4O3sp87aCze3OYRAuM=\n-----END PRIVATE KEY-----\n",
        client_email: "dialogflow-vbkbvu@test-9mnk.iam.gserviceaccount.com"
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
            access_token: "EAAJUPFUQ9b4BAJTTZBoanZByJPs6Jn2lDMZCqDxwqiBfxIiBBQYDZCsHfvqGjZC5TWQIsivM7ZAMdRvYNGOgMXzk8SNKz8MMKtEeLWMs5ij48sRzJ9pIwc6iCZCmsAuK5BVxhoLTPPB8MjLS6f3qGZATZAcZANh7w3nmkxKn51xfcC6GJuV2BiRHZBj",
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