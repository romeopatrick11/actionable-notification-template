const express = require('express');
const bodyParser = require('body-parser');
const notifier = require('./notifier');
const template = require('./template');
const Ticket = require('./ticket');
const mockTicket = require('../ticket.json');

const app = express();

// parse application/x-www-form-urlencoded && application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/new-ticket', (req, res) => {
  const ticket = new Ticket(mockTicket);
  notifier.sendNotification(ticket);
  res.sendStatus(200);
});

app.post('/interactive-message', (req, res) => {
  const { actions, channel, callback_id } = JSON.parse(req.body.payload);
  const ticket = Ticket.find(callback_id);
  const action = actions[0];

  if (ticket) {
    const selected = action.selected_options[0].value;

    ticket.updateField(actions.name, selected).then((result) => {
      notifier.sendUpdateNotification(result, channel.id, action.name);
      res.send(template.fill(result));
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
