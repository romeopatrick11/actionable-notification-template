const labels = ['High', 'Medium', 'Low'];

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const fill = (ticket) => {
  const attachment = {
    title: ticket.title,
    title_link: ticket.link,
    text: ticket.description,
    callback_id: ticket.id,
  };

  attachment.fields = [];
  for (const key of Object.keys(ticket.fields)) {
    attachment.fields.push({
      title: capitalizeFirstLetter(key),
      value: ticket.fields[key],
      short: true,
    });
  }

  attachment.actions = [{
    name: 'action',
    text: 'Action',
    type: 'button',
    value: 'action',
  },
  {
    name: 'priority',
    text: 'Set a priority',
    type: 'select',
    options: labels.map(label => ({ text: label, value: label })),
  },
  {
    name: 'agent',
    text: 'Assign agent',
    type: 'select',
    data_source: 'users',
  }];

  return { attachments: [attachment] };
};


module.exports = { fill };
