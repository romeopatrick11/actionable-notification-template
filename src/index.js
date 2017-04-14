const express = require('express'),
      bodyParser = require('body-parser'),
      notifier = require('./notifier');
      template = require('./template')
      Ticket = require('./ticket');
      mockTicket = require('../ticket.json');

app = express()

// parse application/x-www-form-urlencoded && application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/new-ticket', (req, res) => {
  let ticket = new Ticket(mockTicket)
  notifier.sendNotification(ticket)
  res.sendStatus(200)
});

app.post('/interactive-message', (req, res) => {
  let {actions, channel, response_url, callback_id} = JSON.parse(req.body.payload)
  let ticket = Ticket.find(callback_id)

  if (ticket){
    let selected = action[0].selected_options[0].value

    ticket.updateField(action.name, selected).then(result => {
      notifier.sendUpdateNotification(result, channel.id, action.name)
      res.send(template.fill(result))
    })
  }
});

app.listen(process.env.PORT, function () {
  console.log(`App listening on port ${ process.env.PORT }!`);
});

