const qs = require('querystring'),
      axios = require('axios'),

find = (slackUserId) => {
  let body = { token: process.env.TOKEN, user: slackUserId }
  let promise = axios.post('https://slack.com/api/users.info', qs.stringify(body));

  return promise
}

module.exports = {find}
