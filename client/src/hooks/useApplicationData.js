import axios from "axios";
import { useEffect, useReducer } from "react";
import io from "socket.io-client";

export default function useApplicationData() {
  // Establishing state structure for app
  const initialState = {
    user: { id: 1, name: "Test", avatar: "" },
    room: {},
    channel: {},
    rooms: [],
    channels: [],
    friends: [],
    members: [],
    messages: [],
  };

  const SET_USER = "SET_USER";
  const SET_ROOM = "SET_ROOM";
  const SET_CHANNEL = "SET_CHANNEL";
  const SET_FRIENDS = "SET_FRIENDS";
  const SET_MESSAGES = "SET_MESSAGES";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          user: action.value.user,
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
          messages: action.value.messages,
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

  const setUser = (user) => {
    dispatch({ type: SET_USER, value: user });
  };

  const setChannel = (channel) => {
    dispatch({ type: SET_CHANNEL, value: channel });
  };
  const setRoom = (room) => {
    dispatch({ type: SET_ROOM, value: room });
  };

  const sendMessage = (userID, message) => {
    return axios.put(`/api/messages/${userID}`, message).then(() => {
      dispatch({
        type: SET_MESSAGES,
        value: { messages: messages },
      });
    });
  };

  // TODO: Websocket for updating new messages, new channels, and active users in a channel

  // Websocket
  useEffect(() => {
    // in client/.env, set REACT_APP_WEBSOCKET_URL=localhost:[port that the server is running on, currently 8080]
    const socket = io(process.env.REACT_APP_WEBSOCKET_URL);

    socket.on("connect", () => {
      // Sends the user object to the server, the server tracks connected users by their unique socket.id
      socket.emit("user", state.user);

      socket.on("user", (event) => {
        console.log(event);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Retrieves data from the server database to populate state
  useEffect(() => {
    Promise.all([
      axios.get(`/api/rooms/${state.user.id}`),
      axios.get(`/api/channels/${state.user.id}`),
      axios.get(`/api/messages/${state.user.id}`),
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
  }, [state.user.id]);

  return {
    state,
    setChannel,
    setRoom,
    setUser,
    sendMessage,
  };
}
