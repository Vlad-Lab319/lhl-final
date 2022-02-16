// TODO: getUsersForRoom needs to be implemented

const getChannelsForRoom = (room, state) => {
  return state.channels.filter((channel) => channel.room_id === room.id);
};

const getMessagesForChannel = (channel, state) => {
  return state.messages.filter((message) => message.channel_id === channel.id);
};

//TODO: update getter for direct messages after ERD is updated
const getDirectMessages = (state) => {
  // return state.messages.filter((message) => message.channel_id === null && message.recipient_id === recipient.id);
  return state.messages.filter((message) => message.channel_id === null);
}

export { getChannelsForRoom, getMessagesForChannel, getDirectMessages };
