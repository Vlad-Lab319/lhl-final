import axios from "axios";
import { useEffect } from "react";
import io from "socket.io-client";
import useStateManager from "./useStateManager";

export default function useApplicationData() {
  const { state, dispatch, r } = useStateManager();
  // --------------------------INITIALIZE DATA----------------------------------

  const initialFetch = async (user) => {
    if (user.id) {
      try {
        const [
          { data: users },
          { data: rooms },
          { data: channels },
          { data: messages },
          { data: friends },
          { data: friendRequests },
          { data: privateMessages },
          { data: messagesSeen },
        ] = await Promise.all([
          axios.get(`/api/users/`),
          axios.get(`/api/rooms/${user.id}`),
          axios.get(`/api/channels/${user.id}`),
          axios.get(`/api/messages/`),
          axios.get(`/api/users/friends/${user.id}`),
          axios.get(`/api/users/friends/requests/${user.id}`),
          axios.get(`/api/messages/private/${user.id}`),
          axios.get(`/api/messages/seen/public/${user.id}`),
        ]);
        const messageCountRooms = rooms.map((room) => {
          return {
            ...room,
            messageCount: messages.length
              ? messages.filter((message) => message.room_id === room.id).length
              : 0,
          };
        });
        const messageSeenRooms = messageCountRooms.map((room) => {
          return {
            ...room,
            messagesSeen:
              (messagesSeen.length &&
                messagesSeen.find((record) => {
                  return room.id === record.room_id;
                })) ||
              0,
          };
        });

        const final = messageSeenRooms.map((room) => {
          return {
            ...room,
            messagesSeen:
              room.messagesSeen === 0 ? 0 : room.messagesSeen.messages_seen,
          };
        });

        dispatch({
          type: r.SET_APPLICATION_DATA,
          value: {
            users,
            rooms: final,
            channels,
            messages,
            friends,
            friendRequests,
            privateMessages,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const socketMan = (user) => {
    if (user.id) {
      const socket = io(process.env.REACT_APP_WEBSOCKET_URL);
      socket.connect().emit("updateActiveUsers", {
        type: r.SET_ACTIVE_USERS,
        value: user,
      });

      setSocket(socket);

      socket.on("sendfriendrequest", (action) => {
        dispatch({ type: action.type, value: action.value });
      });

      socket.on("cancelfriendrequest", (action) => {
        dispatch({ type: action.type, value: action.value });
      });

      socket.on("acceptfriendrequest", (action) => {
        dispatch({ type: action.type, value: action.value });
      });

      socket.on("updateRooms", (id) => {
        axios.get(`/api/rooms/${state.user.id}`).then((rooms) => {
          dispatch({
            type: r.SET_ROOMS,
            value: rooms.data,
          });
          dispatch({
            type: r.SET_ROOM,
            value: rooms.data.find((room) => room.id === id.id) || {},
          });
        });
      });

      socket.on("updateChannels", () => {
        axios.get(`/api/channels/${user.id}`).then((channels) => {
          dispatch({
            type: r.SET_CHANNELS,
            value: channels.data,
          });
        });
      });

      socket.on("message", (message) => {
        dispatch({
          type: r.ADD_MESSAGES,
          value: message,
        });
        dispatch({
          type: r.SET_ROOM_MESSAGE_COUNT,
          value: { id: message.room_id },
        });
      });

      socket.on("privatemessage", (action) => {
        dispatch({
          type: action.type,
          value: action.value,
        });
      });

      socket.on("channel", (channel) => {
        dispatch({
          type: r.ADD_CHANNELS,
          value: channel,
        });
      });

      socket.on("updateActiveUsers", (action) => {
        dispatch({
          type: action.type,
          value: action.value,
        });
      });
      return () => socket.disconnect();
    }
  };

  useEffect(() => {
    socketMan(state.user);
    initialFetch(state.user);
  }, [state.user.id]);

  //-------------------------LOGIN/LOGOUT---------------------------------------
  const registerUser = async (name, email, password) => {
    clearErrors();
    try {
      const {
        data: { type, value },
      } = await axios.post(`api/users/register`, {
        name,
        email,
        password,
      });
      dispatch({ type, value });
    } catch (err) {
      console.log(err);
    }
  };
  // TODO: UNCOMMENT - uncomment for deploy
  const loginUser = async (id) => {
    clearErrors();
    try {
      const {
        data: {
          action: { type, value },
        },
      } = await axios.get(`api/users/login/${id}`);
      dispatch({ type, value });
    } catch (err) {
      console.log(err);
    }
  };
  // const loginUser = (email, password) => {
  //   clearErrors();
  //   axios.post(`api/users/login`, { email, password }).then((user) => {
  //     dispatch(user.data.action);
  //   });
  // };
  const logoutUser = () => {
    dispatch({ type: r.LOGOUT });
    if (state.socket) {
      state.socket.disconnect();
    }
  };
  const clearErrors = () => {
    dispatch({ type: r.SET_ERRORS, value: null });
  };

  // ---------------------------STATE SETTERS-----------------------------------

  const setSeenMessages = async (user, room, privateRoom, messageCount) => {
    try {
      if (room) {
        dispatch({
          type: r.SET_ROOM_SEEN,
          value: { id: room.id, messagesSeen: messageCount },
        });
        await axios.post("/api/messages/public/seen", {
          user_id: user.id,
          room_id: room.id,
          messages_seen: room.messageCount,
        });
      } else {
        dispatch({
          type: r.PRIVATE_ROOMS,
          value: { ...room, messagesSeen: messageCount },
        });
        await axios.post(`/api/messages/private/seen`, {
          user_id: user.id,
          private_room_id: privateRoom.id,
          messages_seen: privateRoom.messageCount,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setChannel = (channel, room, user) => {
    dispatch({ type: r.SET_CHANNEL, value: channel });
    dispatch({
      type: r.SET_USER,
      value: { ...user, room_id: room.id, channel_id: channel.id },
    });
    state.socket.emit("updateActiveUsers", {
      type: r.SET_ACTIVE_USERS,
      value: {
        ...user,
        channel_id: channel.id,
      },
    });
  };

  const setRecipient = (recipient) => {
    dispatch({ type: r.SET_RECIPIENT, value: recipient });
  };

  const setRoom = (room, user, directMessage) => {
    directMessage &&
      dispatch({ type: r.SET_DIRECT_MESSAGE, value: !directMessage });
    dispatch({ type: r.SET_ROOM, value: room });
    dispatch({ type: r.SET_PRIVATE_ROOM, value: {} });
    dispatch({ type: r.SET_CHANNEL, value: {} });
    dispatch({
      type: r.SET_USER,
      value: { ...user, room_id: room.id, channel_id: null },
    });
    state.socket.emit("updateActiveUsers", {
      type: r.SET_ACTIVE_USERS,
      value: {
        ...user,
        room_id: room.id,
        channel_id: null,
      },
    });
  };

  const setPrivateRoom = async (user, friend) => {
    const {
      data: { id, participants },
    } = await axios.get(`api/users/privateroom/${user.id}/${friend.id}`);
    dispatch({
      type: r.SET_DIRECT_MESSAGE,
      value: true,
    });
    dispatch({ type: r.SET_ROOM, value: {} });
    dispatch({ type: r.SET_CHANNEL, value: {} });
    dispatch({
      type: r.SET_PRIVATE_ROOM,
      value: { id, participants },
    });
    state.socket.emit("updateActiveUsers", {
      type: r.SET_ACTIVE_USERS,
      value: {
        ...user,
        room_id: null,
        channel_id: null,
      },
    });
  };

  const setSocket = (socket) => {
    dispatch({ type: r.SET_SOCKET, value: socket });
  };

  const toggleDirectMessage = (directMessage) => {
    dispatch({ type: r.SET_DIRECT_MESSAGE, value: !directMessage });
    setRoom({}, state.user);
    setChannel({}, {}, state.user);
  };

  const takeMeHome = () => {
    dispatch({ type: r.SET_DIRECT_MESSAGE, value: false });
    setRoom({}, state.user);
    setChannel({}, {}, state.user);
  };

  // -----------------------------WEBSOCKET-------------------------------------

  const sendFriendRequest = async (user_id, friend_id) => {
    await axios.post("/api/users/friends/add", { user_id, friend_id });
    state.socket.emit("sendfriendrequest", { value: { user_id, friend_id } });
  };

  const cancelFriendRequest = async (user_id, friend_id) => {
    await axios.post("/api/users/friends/delete", { user_id, friend_id });
    state.socket.emit("cancelfriendrequest", {
      value: { user_id, friend_id },
    });
  };

  const acceptFriendRequest = async (user_id, friend_id) => {
    await axios.post("/api/users/friends/accept", { user_id, friend_id });
    state.socket.emit("acceptfriendrequest", {
      value: { user_id, friend_id },
    });
    state.socket.emit("cancelfriendrequest", {
      value: { user_id, friend_id },
    });
  };

  const sendMessage = (messageData) => {
    return axios.post(`/api/messages`, messageData).then((message) => {
      dispatch({
        type: r.ADD_MESSAGES,
        value: message.data[0],
      });
      state.socket.emit("message", message.data[0]);
    });
  };

  const sendPrivateMessage = async (messageData) => {
    console.log("Message Data: ", messageData);
    const { user_id, private_room_id, message, participants } = messageData;
    const res = await axios.post(`/api/messages/private`, {
      user_id,
      private_room_id,
      message,
    });
    const value = res.data;
    dispatch({
      type: r.ADD_PRIVATE_MESSAGE,
      value: value,
    });
    state.socket.emit("privatemessage", {
      value: value,
      participants: participants,
    });
  };

  const createRoom = (roomData) => {
    return axios.post(`/api/rooms`, roomData).then((room) => {
      dispatch({
        type: r.ADD_ROOMS,
        value: room.data[0],
      });
    });
  };

  const editRoom = (name, id) => {
    return axios.post(`/api/rooms/edit`, { name, id }).then(() => {
      state.socket.emit("updateRooms", { id });
    });
  };

  const deleteRoom = (id) => {
    return axios.post(`/api/rooms/delete`, { id }).then(() => {
      state.socket.emit("updateRooms", { id });
    });
  };

  const editChannel = (name, id) => {
    return axios.post(`/api/channels/edit`, { name, id }).then(() => {
      state.socket.emit("updateChannels");
    });
  };

  const deleteChannel = (id) => {
    return axios.post(`/api/channels/delete`, { id }).then(() => {
      state.socket.emit("updateChannels");
    });
  };

  const createChannel = (channelData) => {
    return axios.post(`/api/channels`, channelData).then((channel) => {
      dispatch({
        type: r.ADD_CHANNELS,
        value: channel.data[0],
      });
      state.socket.emit("channel", channel.data[0]);
    });
  };

  const addUserToRoom = (userID, roomID) => {
    return axios
      .post("/api/rooms/adduser", { userID, roomID })
      .then(state.socket.emit("updateRooms", { id: roomID }));
  };

  return {
    state,
    setChannel,
    setRoom,
    loginUser,
    logoutUser,
    sendMessage,
    sendPrivateMessage,
    setRecipient,
    registerUser,
    createRoom,
    createChannel,
    clearErrors,
    addUserToRoom,
    editRoom,
    editChannel,
    deleteRoom,
    deleteChannel,
    toggleDirectMessage,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    setPrivateRoom,
    takeMeHome,
    setSeenMessages,
  };
}
