import axios from "axios";
import { useEffect } from "react";
import io from "socket.io-client";
import useStateManager from "./useStateManager";

export default function useApplicationData() {
  const { state, dispatch, r } = useStateManager();
  // TODO: UNCOMMENT - uncomment for deploy
  // const loginUser = (email, password) => {
  //   clearErrors();
  //   axios.post(`api/users/login`, { email, password }).then((user) => {
  //     dispatch(user.data.action);
  //   });
  // };

  const loginUser = (id) => {
    clearErrors();
    axios.get(`api/users/${id}`).then((user) => {
      dispatch(user.data.action);
    });
  };

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

  const setChannel = (channel) => {
    dispatch({ type: r.SET_CHANNEL, value: channel });
    //TODO: SOCKET - socket.emit("channel", state.channel.id)
  };

  const setRecipient = (recipient) => {
    dispatch({ type: r.SET_RECIPIENT, value: recipient });
  };

  const logoutUser = () => {
    dispatch({ type: r.SET_USER, value: null });
    if (state.socket) {
      state.socket.disconnect();
    }
  };

  const setRoom = (room) => {
    dispatch({ type: r.SET_ROOM, value: room });
    dispatch({ type: r.SET_CHANNEL, value: {} });
    //TODO: SOCKET - socket.emit("room", state.room.id)
  };

  const setSocket = (socket) => {
    dispatch({ type: r.SET_SOCKET, value: socket });
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

  const createRoom = (roomData) => {
    return axios.post(`/api/rooms`, roomData).then((room) => {
      dispatch({
        type: r.ADD_ROOMS,
        value: room.data[0],
      });
      state.socket.emit("room", room.data[0]);
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

  const clearErrors = () => {
    dispatch({ type: r.SET_ERRORS, value: null });
  };

  const socketUpdate = (action) => {
    dispatch({ type: action.type, value: action.value });
  };
  // Websocket
  useEffect(() => {
    // in client/.env, set REACT_APP_WEBSOCKET_URL=localhost:[port that the server is running on, currently 8080]
    if (state.user !== null) {
      const socket = io(process.env.REACT_APP_WEBSOCKET_URL);
      setSocket(socket);

      socket.on("connect", () => {
        socket.emit("update", { type: r.SET_USERS, value: state.user });
      });

      socket.on("message", (message) => {
        dispatch({
          type: r.ADD_MESSAGES,
          value: message,
        });
      });

      socket.on("room", (room) => {
        dispatch({
          type: r.ADD_ROOMS,
          value: room,
        });
      });

      socket.on("channel", (channel) => {
        dispatch({
          type: r.ADD_CHANNELS,
          value: channel,
        });
      });

      socket.on("update", (action) => {
        socketUpdate(action);
      });

      return () => socket.disconnect();
    }
  }, [state.user]);

  // Retrieves data from the server database to populate state
  useEffect(() => {
    if (state.user) {
      Promise.all([
        axios.get(`/api/users/`),
        axios.get(`/api/rooms/${state.user.id}`),
        axios.get(`/api/channels/${state.user.id}`),
        // axios.get(`/api/messages/${state.user.id}`),
        axios.get(`/api/messages/`),
        axios.get(`/api/users/friends/${state.user.id}`),
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
  }, [state.user]);

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
  };
}
