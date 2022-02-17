import axios from "axios";
import { useEffect, useReducer } from "react";
import io from "socket.io-client";

export default function useApplicationData() {
  // Establishing state structure for app
  const initialState = {
    user: null,
    users: {},
    socket: null,
    room: {},
    channel: {},
    rooms: [],
    channels: [],
    friends: [],
    recipient: {},
    members: [],
    messages: [],
    errors: null,
  };

  const SET_SOCKET = "SET_SOCKET";
  const SET_USER = "SET_USER";
  const SET_USERS = "SET_USERS";
  const SET_ROOM = "SET_ROOM";
  const SET_CHANNEL = "SET_CHANNEL";
  const SET_FRIENDS = "SET_FRIENDS";
  const SET_RECIPIENT = "SET_RECIPIENT";
  const ADD_MESSAGES = "ADD_MESSAGES";
  const ADD_ROOMS = "ADD_ROOMS";
  const ADD_CHANNELS = "ADD_CHANNELS";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_ERRORS = "SET_ERRORS";

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case SET_SOCKET:
        return {
          ...state,
          socket: action.value,
        };
      case SET_USER:
        return {
          ...state,
          user: action.value,
        };
      case SET_USERS:
        console.log(action.value);
        return {
          ...state,
          users: action.value,
        };
      case SET_ROOM:
        return {
          ...state,
          room: action.value,
        };
      case SET_CHANNEL:
        return {
          ...state,
          channel: action.value,
        };
      case SET_FRIENDS:
        return {
          ...state,
          friends: action.value, // changed from channel
        };
      case SET_RECIPIENT:
        return {
          ...state,
          recipient: action.value,
        };
      case ADD_MESSAGES:
        return {
          ...state,
          messages: [...state.messages, action.value],
        };
      case ADD_ROOMS:
        return {
          ...state,
          rooms: [...state.rooms, action.value],
        };
      case ADD_CHANNELS:
        return {
          ...state,
          channels: [...state.channels, action.value],
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          users: action.value.users,
          rooms: action.value.rooms,
          channels: action.value.channels,
          friends: action.value.friends,
          messages: action.value.messages,
        };
      case SET_ERRORS:
        return {
          ...state,
          errors: action.value,
        };
      default:
        return { ...state };
    }
  }

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
    dispatch({ type: SET_CHANNEL, value: channel });
    //TODO: SOCKET - socket.emit("channel", state.channel.id)
  };

  const setRecipient = (recipient) => {
    dispatch({ type: SET_RECIPIENT, value: recipient });
  };

  const logoutUser = () => {
    dispatch({ type: SET_USER, value: null });
    if (state.socket) {
      state.socket.disconnect();
    }
  };

  const setRoom = (room) => {
    dispatch({ type: SET_ROOM, value: room });
    dispatch({ type: SET_CHANNEL, value: {} });
    //TODO: SOCKET - socket.emit("room", state.room.id)
  };

  const setSocket = (socket) => {
    dispatch({ type: SET_SOCKET, value: socket });
  };

  const sendMessage = (messageData) => {
    return axios.post(`/api/messages`, messageData).then((message) => {
      dispatch({
        type: ADD_MESSAGES,
        value: message.data[0],
      });
      state.socket.emit("message", message.data[0]);
    });
  };

  const createRoom = (roomData) => {
    return axios.post(`/api/rooms`, roomData).then((room) => {
      dispatch({
        type: ADD_ROOMS,
        value: room.data[0],
      });
      state.socket.emit("room", room.data[0]);
    });
  };

  const createChannel = (channelData) => {
    return axios.post(`/api/channels`, channelData).then((channel) => {
      dispatch({
        type: ADD_CHANNELS,
        value: channel.data[0],
      });
      state.socket.emit("channel", channel.data[0]);
    });
  };

  const clearErrors = () => {
    dispatch({ type: SET_ERRORS, value: null });
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
        socket.emit("update", { type: SET_USERS, value: state.user });
      });

      socket.on("message", (message) => {
        dispatch({
          type: ADD_MESSAGES,
          value: message,
        });
      });

      socket.on("room", (room) => {
        dispatch({
          type: ADD_ROOMS,
          value: room,
        });
      });

      socket.on("channel", (channel) => {
        dispatch({
          type: ADD_CHANNELS,
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
          type: SET_APPLICATION_DATA,
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
