const express = require('express');
const bodyParser = require('body-parser');
const messageWebhook = require('./message-webhook');
const verifyWebhook = require('./verify-webhook');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', verifyWebhook);
app.post('/', messageWebhook);


app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP);
app.listen(app.get('port'), app.get('ip'), () => console.log('Express server is listening on port 5000'));