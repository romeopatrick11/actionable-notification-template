const JsonDB = require('node-json-db');
channelDB = new JsonDB("channels", true, false);
nonceDB = new JsonDB("nonce", true, false);

find_or_create = (channel_id) => {
  let channel = false;

  try{ channel = channelDB.getData(`/${channel_id}`); } catch(error) {}

  if(!channel){
    nonce = `${+ new Date()}${Math.floor((Math.random() * 100) + 1)}`
    channelDB.push(`/${channel_id}`, nonce)
    nonceDB.push(`/${nonce}`, channel_id)

    //notifier.sendNewChannelNotification(channel_id, nonce)
  }
}

find_by_nonce = (nonce) => {
  let channel = false;

  try{ channel = nonceDB.getData(`/${nonce}`); } catch(error) {}

  return channel
}

module.exports = {find_or_create, find_by_nonce}
