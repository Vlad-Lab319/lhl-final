require("dotenv").config();
const db = require("./db/index");
// const socketServer = require("./socketServer");
const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const { Server, Socket } = require("socket.io");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const PORT = process.env.SERVER_PORT || 8080;

const usersRoutes = require("./routes/users");
const roomsRoutes = require("./routes/rooms");
const channelsRoutes = require("./routes/channels");
const messagesRoutes = require("./routes/messages");

app.use("/api/users", usersRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/channels", channelsRoutes);
app.use("/api/messages", messagesRoutes);

// socket stuff below

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = {};
const reducerVariables = {
  SET_SOCKET: "SET_SOCKET",
  SET_USER: "SET_USER",
  SET_USERS: "SET_USERS",
  SET_ROOM: "SET_ROOM",
  SET_ROOMS: "SET_ROOMS",
  SET_CHANNEL: "SET_CHANNEL",
  SET_CHANNELS: "SET_CHANNELS",
  SET_FRIENDS: "SET_FRIENDS",
  SET_RECIPIENT: "SET_RECIPIENT",
  ADD_MESSAGES: "ADD_MESSAGES",
  ADD_ROOMS: "ADD_ROOMS",
  ADD_CHANNELS: "ADD_CHANNELS",
  SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
  SET_ERRORS: "SET_ERRORS",
  SET_ACTIVE_USERS: "SET_ACTIVE_USERS",
  TOGGLE_DIRECT_MESSAGE: "TOGGLE_DIRECT_MESSAGE",
  SET_FRIEND_REQUEST: "SET_FRIEND_REQUEST",
  CANCEL_FRIEND_REQUEST: "CANCEL_FRIEND_REQUEST",
  ADD_FRIEND: "ADD_FRIEND",
  ADD_PRIVATE_MESSAGE: "ADD_PRIVATE_MESSAGE",
};

const r = reducerVariables;

const getUserBySocket = (socketID) => {
  return Object.values(users).find((user) => user.socketID === socketID);
};

io.on("connection", (socket) => {
  socket.on("updateActiveUsers", (action) => {
    users[action.value.id] = { ...action.value, socketID: socket.id };
    io.emit("updateActiveUsers", {
      type: r.SET_ACTIVE_USERS,
      value: users,
    });
  });

  socket.on("sendfriendrequest", (action) => {
    const sender = users[action.value.user_id];
    const receiver = users[action.value.friend_id];
    db.query(
      `SELECT id, username AS name, avatar_url AS avatar FROM users WHERE id IN($1,$2)`,
      [action.value.user_id, action.value.friend_id]
    ).then((data) => {
      const sendingUser =
        data.rows[0].id === action.value.user_id ? data.rows[0] : data.rows[1];
      const receivingUser =
        data.rows[0].id === action.value.friend_id
          ? data.rows[0]
          : data.rows[1];
      if (sender) {
        io.to(sender.socketID).emit("sendfriendrequest", {
          type: r.SET_FRIEND_REQUEST,
          value: { from: sendingUser, to: receivingUser },
        });
      }
      if (receiver) {
        io.to(receiver.socketID).emit("sendfriendrequest", {
          type: r.SET_FRIEND_REQUEST,
          value: { from: sendingUser, to: receivingUser },
        });
      }
    });
  });

  socket.on("cancelfriendrequest", (action) => {
    const sender = users[action.value.user_id];
    const receiver = users[action.value.friend_id];
    db.query(
      `SELECT id, username AS name, avatar_url AS avatar FROM users WHERE id IN($1,$2)`,
      [action.value.user_id, action.value.friend_id]
    ).then((data) => {
      const sendingUser =
        data.rows[0].id === action.value.user_id ? data.rows[0] : data.rows[1];
      const receivingUser =
        data.rows[0].id === action.value.friend_id
          ? data.rows[0]
          : data.rows[1];
      if (sender) {
        io.to(sender.socketID).emit("cancelfriendrequest", {
          type: r.CANCEL_FRIEND_REQUEST,
          value: { from: sendingUser, to: receivingUser },
        });
      }
      if (receiver) {
        io.to(receiver.socketID).emit("cancelfriendrequest", {
          type: r.CANCEL_FRIEND_REQUEST,
          value: { from: sendingUser, to: receivingUser },
        });
      }
    });
  });

  socket.on("acceptfriendrequest", (action) => {
    const sender = users[action.value.user_id];
    const receiver = users[action.value.friend_id];
    db.query(
      `SELECT id, username AS name, avatar_url AS avatar FROM users WHERE id IN($1,$2)`,
      [action.value.user_id, action.value.friend_id]
    ).then((data) => {
      const sendingUser =
        data.rows[0].id === action.value.user_id ? data.rows[0] : data.rows[1];
      const receivingUser =
        data.rows[0].id === action.value.friend_id
          ? data.rows[0]
          : data.rows[1];
      if (sender) {
        io.to(sender.socketID).emit("acceptfriendrequest", {
          type: r.ADD_FRIEND,
          value: receivingUser,
        });
      }
      if (receiver) {
        io.to(receiver.socketID).emit("acceptfriendrequest", {
          type: r.ADD_FRIEND,
          value: sendingUser,
        });
      }
    });
  });

  socket.on("updateRooms", (id) => {
    io.emit("updateRooms", id);
  });

  socket.on("updateChannels", () => {
    socket.broadcast.emit("updateChannels");
  });

  socket.on("message", (messageData) => {
    socket.broadcast.emit("message", messageData);
  });

  socket.on("privatemessage", (messageData) => {
    const { value, participants } = messageData;
    const receivingUserId = participants.filter((id) => id != value.user_id)[0];
    const receiverUser = users[receivingUserId];
    if (receiverUser) {
      console.log("receiverUser: ", receiverUser);
      io.to(receiverUser.socketID).emit("privatemessage", {
        type: r.ADD_PRIVATE_MESSAGE,
        value: value,
      });
    }
  });

  socket.on("channel", (channelData) => {
    socket.broadcast.emit("channel", channelData);
  });

  socket.on("disconnect", () => {
    const user = getUserBySocket(socket.id);
    if (user) {
      delete users[user.id];
      io.emit("updateActiveUsers", {
        type: r.SET_ACTIVE_USERS,
        value: users,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
