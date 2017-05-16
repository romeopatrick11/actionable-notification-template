const qs = require('querystring'),
      axios = require('axios'),
      template = require('./template')

sendNotification = (ticket, channel_id) => {
  let body = template.fill(ticket, true);
  body.token = process.env.TOKEN
  body.channel = channel_id

  postMessage(body)
}

sendUpdateNotification = (ticket, channel, field) => {
  let body = {channel: channel, token: process.env.TOKEN,
    text:`<${ticket.link}|${ticket.title}> ${field} updated!` }

  postMessage(body)
}

postMessage = (body) => {
  let sendMessage = axios.post('https://slack.com/api/chat.postMessage',
    qs.stringify(body));

  sendMessage.then(logResult);
}

capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

logResult = result => {
  console.log(result.data);
}

module.exports = {sendNotification, sendUpdateNotification};
