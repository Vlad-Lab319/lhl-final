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
};

const attachUsersToMessages = (messages, state) => {
  return messages.map((msg) => {
    return {
      ...msg,
      user: state.users.find((user) => user.id === msg.user_id),
    };
  });
};

const getUsersForRoom = (room, state) => {
  return Object.values(state.activeUsers).filter(
    (user) => user.room_id === room.id
  );
};

const getMessagesForPrivateRoom = (privateRoom, state) => {
  return state.privateMessages.filter((message) => {
    return message.private_room_id === privateRoom.id;
  });
};

const getFilteredArray = (main, filter) => {
  const filteredData = main.filter((arr1) => {
    return !filter.find((arr2) => {
      return arr2.id === arr1.id;
    });
  });

  return filteredData;
};

export {
  getChannelsForRoom,
  getMessagesForChannel,
  attachUsersToMessages,
  getDirectMessages,
  getUsersForRoom,
  getMessagesForPrivateRoom,
  getFilteredArray,
};
