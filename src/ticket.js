const attributes = ['id', 'link', 'title', 'description'];
const fields = ['requester', 'status', 'agent', 'priority'];
const exampleTicket = require('../ticket.json');
const users = require('./users');

class Ticket {
  constructor(options) {
    for (const attr of attributes) this[attr] = options[attr];
    this.fields = {};
    for (const field of fields) this.fields[field] = options[field];
  }

  updateField(field, value) {
    switch (field) {
      case 'agent': return this.setAgent(value);
      case 'priority': return this.setPriority(value);
      default: return null;
    }
  }

  setAgent(userId) {
    users.find(userId).then((result) => {
      this.fields.agent = result.data.user.name;
      return Promise.resolve(this);
    });
  }

  setPriority(priority) {
    this.fields.priority = priority;
    return Promise.resolve(this);
  }

  static find(id) {
    return new Ticket(exampleTicket);
  }
}

module.exports = Ticket;
