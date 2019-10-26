// Load the 
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Twilio = require('twilio');
const app = express();
const port = 3000;

// Uses the environment variables set in .env
const client = new Twilio();

// This is a single page application and it's all rendered in public/index.html
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api/messages', async (req, res) => {
    const sentMessages  = await client.messages.list({
        from: process.env.TWILIO_PHONE_NUMBER
    });
    const messages = sentMessages.map(sent => sent.body);
    res.json(messages);
});

app.post('/api/messages', async (req, res) => {
    const to = req.body.to;
    const from = process.env.TWILIO_PHONE_NUMBER;
    const body = `${req.body.sender} says: ${req.body.receiver} is ${req.body.compliment}. See more compliments at ${req.headers['referer']}`;
    const message = await client.messages.create({
        to,
        from,
        body
    });
    res.json({body: message.body});
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));


