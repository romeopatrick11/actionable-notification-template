const qs = require('querystring'),
      axios = require('axios'),

find = (slackUserId) => {
  let body = { token: process.env.TOKEN, user: slackUserId }
  let promise = axios.post('https://slack.com/api/users.info', qs.stringify(body));

  return promise
}

getBotUserID = () => {
  return new Promise( (resolve, reject) => {
    let body = { token: process.env.TOKEN }
    let authTest = axios.post('https://slack.com/api/auth.test', qs.stringify(body));

    authTest.then(result => {
      console.log(result.data.user_id)
      resolve(result.data.user_id)
    })
  })
}

module.exports = {find, getBotUserID}
