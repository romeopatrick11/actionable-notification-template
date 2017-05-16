const express = require('express'),
      bodyParser = require('body-parser'),
      notifier = require('./notifier'),
      template = require('./template'),
      Ticket = require('./ticket'),
      mockTicket = require('../ticket.json'),
      channel = require('./channel');

app = express()

// parse application/x-www-form-urlencoded && application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/new-ticket/:channel_nonce', (req, res) => {
  let ticket = new Ticket(mockTicket)
  let channelId = channel.find_by_nonce(req.params.channel_nonce)
  if(channelId){
    notifier.sendNotification(ticket, channelId)
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
});

app.post('/events', (req, res) => {
  switch(req.body.type) {
    case "url_verification": {
      // verify Events API endpoint by returning challenge if present
      res.status(200).send({"challenge": req.body.challenge});
      break;
    }
    case "event_callback": {
      // check verification token here
      event = req.body.event;

      if (event.type == "member_joined_channel"){
        if (event.user == app.botId){
          channel.find_or_create(event.channel)
        }
      }

      res.sendStatus(200)
      break;
    }
  }
});

app.post('/interactive-message', (req, res) => {
  let {actions, channel, response_url, callback_id} = JSON.parse(req.body.payload)
  let ticket = Ticket.find(callback_id)

  if (ticket){
    let action = actions[0]
    let selected = action.selected_options[0].value

    ticket.updateField(action.name, selected).then(result => {
      notifier.sendUpdateNotification(result, channel.id, action.name)
      res.send(template.fill(result))
    })
  }
});

app.listen(process.env.PORT, function () {
  console.log(`App listening on port ${ process.env.PORT }!`);
  users.getBotUserID().then(result => {
    app.botId = result;
  });
});

