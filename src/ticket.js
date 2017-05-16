const attributes = ['id', 'link', 'title', 'description'],
      fields = ['requester', 'status', 'agent', 'priority'],
      exampleTicket = require('../ticket.json'),
      users = require('./users');

class Ticket {
  constructor(options) {
    for(let attr of attributes) this[attr] = options[attr];
    this.fields = {};
    for(let field of fields) this.fields[field] = options[field];
  }

  updateField(field, value) {
    switch(field){
      case 'agent': return this.setAgent(value);
      case 'priority': return this.setPriority(value);
    }
  }

  setAgent(userId) {
    return new Promise( (resolve, reject) => {
      users.find(userId).then(result => {
        this.fields.agent = result.data.user.name;
        resolve(this);
      });
    });
  }

  setPriority(priority) {
    return new Promise( (resolve, reject) => {
      this.fields.priority = priority;
      resolve(this);
    });
  }

  static find(id) {
    return new Ticket(exampleTicket);
  }
}

module.exports = Ticket;
