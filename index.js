const express = require('express');
const bodyParser = require('body-parser');
const messageWebhook = require('./message-webhook');
const verifyWebhook = require('./verify-webhook');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', verifyWebhook);
app.post('/', messageWebhook);
app.get('/', (req, res) => {
    res.send("Home page. Server running okay.");
});

app.set('port', process.env.OPENSHIFT_NODEJS_PORT);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP);
app.listen(app.get('port'), app.get('ip'), () => console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port')));