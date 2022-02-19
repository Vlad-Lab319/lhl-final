import axios from "axios";
import { useEffect } from "react";
import io from "socket.io-client";
import useStateManager from "./useStateManager";

export default function useApplicationData() {
  const { state, dispatch, r } = useStateManager();
  // --------------------------INITIALIZE DATA----------------------------------

  const initialFetch = (user) => {
    if (user.id) {
      Promise.all([
        axios.get(`/api/users/`),
        axios.get(`/api/rooms/${user.id}`),
        axios.get(`/api/channels/${user.id}`),
        // axios.get(`/api/messages/${user.id}`),
        axios.get(`/api/messages/`),
        axios.get(`/api/users/friends/${user.id}`),
        // TODO: Needs route for getting all users who are in the same rooms as the currently signed in user
        // axios.get(`/api/users/${state.user.id}`),
      ]).then((all) => {
        const [users, rooms, channels, messages, friends] = all;
        dispatch({
          type: r.SET_APPLICATION_DATA,
          value: {
            users: users.data,
            rooms: rooms.data,
            channels: channels.data,
            messages: messages.data,
            friends: friends.data,
          },
        });
      });
    }
  };

  useEffect(() => {
    initialFetch(state.user);
  }, [state.user.id, state.user]);

  //-------------------------LOGIN/LOGOUT---------------------------------------
  const registerUser = (name, email, password) => {
    clearErrors();
    axios
      .post(`api/users/register`, {
        name,
        email,
        password,
      })
      .then((user) => {
        dispatch(user.data.action);
      });
  };
  // TODO: UNCOMMENT - uncomment for deploy
  const loginUser = (id) => {
    clearErrors();
    axios.get(`api/users/${id}`).then((user) => {
      dispatch(user.data.action);
    });
  };
  // const loginUser = (email, password) => {
  //   clearErrors();
  //   axios.post(`api/users/login`, { email, password }).then((user) => {
  //     dispatch(user.data.action);
  //   });
  // };
  const logoutUser = () => {
    dispatch({ type: r.SET_USER, value: { id: null } });
    if (state.socket) {
      state.socket.disconnect();
    }
  };
  const clearErrors = () => {
    dispatch({ type: r.SET_ERRORS, value: null });
  };

  // ---------------------------STATE SETTERS-----------------------------------
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
        room_id: room.id,
        channel_id: channel.id,
      },
    });
  };

  const setRecipient = (recipient) => {
    dispatch({ type: r.SET_RECIPIENT, value: recipient });
  };

  const setRoom = (channel, room, user) => {
    dispatch({ type: r.SET_ROOM, value: room });
    dispatch({ type: r.SET_CHANNEL, value: {} });
    dispatch({
      type: r.SET_USER,
      value: { ...user, room_id: room.id, channel_id: channel.id },
    });
    state.socket.emit("updateActiveUsers", {
      type: r.SET_ACTIVE_USERS,
      value: {
        ...user,
        room_id: room.id,
        channel_id: channel.id,
      },
    });
  };

  const setSocket = (socket) => {
    dispatch({ type: r.SET_SOCKET, value: socket });
  };
  // -----------------------------WEBSOCKET-------------------------------------

  const sendMessage = (messageData) => {
    return axios.post(`/api/messages`, messageData).then((message) => {
      dispatch({
        type: r.ADD_MESSAGES,
        value: message.data[0],
      });
      state.socket.emit("message", message.data[0]);
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
      state.socket.emit("updateRooms");
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

  const addUserToRoom = (id, room) => {
    return axios
      .post("/api/rooms/adduser", { userID: id, roomID: room.id })
      .then(state.socket.emit("updateRooms"));
  };

  useEffect(() => {
    if (state.user.id) {
      const socket = io(process.env.REACT_APP_WEBSOCKET_URL);
      socket.connect();
      setSocket(socket);

      socket.on("connection", () => {
        socket.emit("updateActiveUsers", {
          type: r.SET_ACTIVE_USERS,
          value: state.user,
        });
      });

      socket.on("updateRooms", () => {
        axios.get(`/api/rooms/${state.user.id}`).then((rooms) => {
          dispatch({
            type: r.SET_ROOMS,
            value: rooms.data,
          });
          dispatch({
            type: r.SET_ROOM,
            value: {},
          });
        });
      });

      socket.on("message", (message) => {
        dispatch({
          type: r.ADD_MESSAGES,
          value: message,
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
  }, [state.user.id]);

  return {
    state,
    setChannel,
    setRoom,
    loginUser,
    logoutUser,
    sendMessage,
    setRecipient,
    registerUser,
    createRoom,
    createChannel,
    clearErrors,
    addUserToRoom,
    editRoom,
  };
}
