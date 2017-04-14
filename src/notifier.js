const qs = require('querystring'),
      axios = require('axios'),
      template = require('./template')

sendNotification = (ticket, url) => {
  let message = template.fill(ticket);
  let sendMessage = axios.post(url || process.env.WEBHOOK, message);
  sendMessage.then(logResult);
}

sendUpdateNotification = (ticket, channel, field) => {
  let body = {channel: channel, token: process.env.TOKEN,
    text:`<${ticket.link}|${ticket.title}> ${field} updated!` }
  let sendMessage = axios.post('https://slack.com/api/chat.postMessage', qs.stringify(body));
  sendMessage.then(logResult);
}

capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

logResult = result => {
  console.log(result.data);
}

module.exports = {sendNotification, sendUpdateNotification};
