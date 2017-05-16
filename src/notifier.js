const qs = require('querystring');
const axios = require('axios');
const template = require('./template');

const logResult = (result) => { console.log(result.data); };

const sendNotification = (ticket, url) => {
  const message = template.fill(ticket);
  const sendMessage = axios.post(url || process.env.WEBHOOK, message);
  sendMessage.then(logResult);
};

const sendUpdateNotification = (ticket, channel, field) => {
  const body = {
    channel,
    token: process.env.TOKEN,
    text: `<${ticket.link}|${ticket.title}> ${field} updated!`,
  };
  const sendMessage = axios.post('https://slack.com/api/chat.postMessage', qs.stringify(body));
  sendMessage.then(logResult);
};

module.exports = { sendNotification, sendUpdateNotification };
