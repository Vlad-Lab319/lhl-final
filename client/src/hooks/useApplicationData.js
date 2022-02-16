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
    members: [],
    messages: [],
  };
  const SET_SOCKET = "SET_SOCKET";
  const SET_USER = "SET_USER";
  const SET_USERS = "SET_USERS";
  const SET_ROOM = "SET_ROOM";
  const SET_CHANNEL = "SET_CHANNEL";
  const SET_FRIENDS = "SET_FRIENDS";
  const SET_MESSAGES = "SET_MESSAGES";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";

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
          channel: action.value,
        };
      case SET_MESSAGES:
        return {
          ...state,
          messages: [...state.messages, action.value],
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          rooms: action.value.rooms,
          channels: action.value.channels,
          friends: action.value.friends,
          messages: action.value.messages,
        };
      default:
        return { ...state };
    }
  }

  const loginUser = async (id) => {
    axios.get(`api/users/${id}`).then((user) => {
      if (user.data) {
        dispatch({ type: SET_USER, value: user.data });
      }
    });
  };

  const setChannel = (channel) => {
    dispatch({ type: SET_CHANNEL, value: channel });
  };

  const setRoom = (room) => {
    dispatch({ type: SET_ROOM, value: room });
    dispatch({ type: SET_CHANNEL, value: {} });
  };

  const setSocket = (socket) => {
    dispatch({ type: SET_SOCKET, value: socket });
  };

  const sendMessage = (messageData) => {
    return axios
      .post(`/api/messages/${messageData.userID}`, messageData)
      .then((message) => {
        dispatch({
          type: SET_MESSAGES,
          value: message.data[0],
        });
        state.socket.emit("message", message.data[0]);
      });
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
        console.log(message);
        dispatch({
          type: SET_MESSAGES,
          value: message,
        });
      });

      socket.on("update", (action) => {
        console.log(action);
        socketUpdate(action);
      });

      return () => socket.disconnect();
    }
  }, [state.user]);

  // Retrieves data from the server database to populate state
  useEffect(() => {
    if (state.user) {
      Promise.all([
        axios.get(`/api/rooms/${state.user.id}`),
        axios.get(`/api/channels/${state.user.id}`),
        axios.get(`/api/messages/all`),
        // TODO: Needs route for getting all users who are in the same rooms as the currently signed in user
        // axios.get(`/api/users/${state.user.id}`),
      ]).then((all) => {
        const [rooms, channels, messages] = all;
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            rooms: rooms.data,
            channels: channels.data,
            messages: messages.data,
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
    sendMessage,
  };
}

// TODO: Websocket for updating new messages, new channels, and active users in a channel

// This app makes a websocket connection immediately
// useEffect(() => {
//   // Connect to server
//   const socket = io("/");
//   setSocket(socket);

//   // All This stuff should be a Custom Hook, right?
//   socket.on("connect", (event) => {
//     console.log("connected");
//   });

//   socket.on("notify", (msg) => {
//     setNotify(msg);
//   });

//   socket.on("status", (msg) => {
//     setStatus(msg);
//   });

//   socket.on("public", (msg) => {
//     setMessages((prev) => ["Broadcast: " + msg.text, ...prev]);
//   });

//   socket.on("private", (msg) => {
//     setMessages((prev) => [`${msg.from} says: ${msg.text}`, ...prev]);
//   });

//   // ensures we disconnect to avoid memory leaks
//   return () => socket.disconnect();
// }, []);
