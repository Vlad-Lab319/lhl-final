const getChannelsForRoom = (room, state) => {
  return state.channels.filter((channel) => channel.room_id === room.id);
};

const getMessagesForChannel = (channel, state) => {
  return state.messages.filter((message) => message.channel_id === channel.id);
};

export { getChannelsForRoom, getMessagesForChannel };
