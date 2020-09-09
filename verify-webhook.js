const verifyWebhook = (req, res) => {
    let VERIFY_TOKEN = 'maxacnhantrongungdungserverjs';

    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
};

module.exports = verifyWebhook;