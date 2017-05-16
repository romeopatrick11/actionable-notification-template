const labels = ['High', 'Medium', 'Low']

fill = (ticket, stringify) => {
  let attachment = {
    title:       ticket.title,
    title_link:  ticket.link,
    text:        ticket.description,
    callback_id: ticket.id,
  }

  attachment.fields = []
  for(let key of Object.keys(ticket.fields)){
    attachment.fields.push({
      title: capitalizeFirstLetter(key),
      value: ticket.fields[key],
      short: true
    })
  }

  attachment.actions = [{
    name: "action",
    text: "Action",
    type: "button",
    value: "action"
  },
  {
    name: "priority",
    text: "Set a priority",
    type: "select",
    options: labels.map( label => {
      return {"text": label, "value": label}
    })
  },
  {
    name: "agent",
    text: "Assign agent",
    type: "select",
    data_source: "users"
  }]

  let attachments = [attachment]
  if(stringify) {
    attachments = JSON.stringify(attachments)
  }

  return { text: "", attachments: attachments }
}

module.exports = {fill}
