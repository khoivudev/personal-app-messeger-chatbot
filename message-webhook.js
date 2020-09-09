const processMessage = require('./process-message');

module.exports = (req, res) => {
    var entries = req.body.entry;
    for (var entry of entries) {
        var events = entry.messaging;
        for (var event of events) {
            var senderId = message.sender.id;
            if (event.message) {
                // If user send text
                if (message.message.text) {
                    var text = event.message.text;
                    console.log(text); // In tin nhắn người dùng
                    processMessage(event);
                }
            }
        }
    }
    res.status(200).send("OK");
};