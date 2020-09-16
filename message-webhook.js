const processMessage = require('./process-message');
const callMyChatBot = require('./callMyChatBot');
const messageWebhook = (req, res) => {
    var entries = req.body.entry;
    for (var entry of entries) {
        var events = entry.messaging;
        for (var event of events) {
            var senderId = event.sender.id;
            if (event.message) {
                // If user send text
                if (event.message.text) {
                    var text = event.message.text;
                    console.log(text); // In tin nhắn người dùng
                    processMessage(event);
                    //callMyChatBot(event);
                }
            }
        }
    }
    res.status(200).send("OK");
};

module.exports = messageWebhook;