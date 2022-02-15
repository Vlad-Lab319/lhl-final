const socketio = require("socket.io");
const users = {};
const SET_MESSAGES = "SET_MESSAGES";

const getUserSocketId = (userid) => {
  return users[userid].socketID;
};

// Web socket connection listener
const listen = function (httpServer) {
  const server = socketio(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  server.on("connection", (socket) => {
    // This socket param is the sending socket. Has a unique ID (socket.id)
    // We can use this ID and associate with a specific user
    console.log("connected:  ", socket.id);

    socket.on("user", (user) => {
      // TODO: This can be simplified after login is implemented
      if (!users[user.id]) {
        users[user.id] = { ...user, socketID: socket.id };
        console.log(users);
        socket.emit("user", users);
      } else {
        console.log(user, " is already connected");
      }
    });

    socket.on("message", (message) => {
      socket.emit("message", { type: SET_MESSAGES, value: message });
    });

    socket.on("disconnect", (event) => {
      // Removes user from connected users pool
      console.log("disconnect: ", socket.id);
      delete users[socket.id];
      console.log(users);
    });

    // Do something whenever a "chat" event is received
    // socket.on("chat", (msg) => {
    //   const from = getUserSocketId(socket.id);
    //   console.log("chat: ", from, msg);

    //   if (!from) {
    //     return server.to(socket.id).emit("notify", `Not Registered`);
    //   }

    //   // Broadcast received message to all if no "to" received
    //   if (!msg.to) {
    //     server.emit("public", { ...msg, from });
    //     server.to(socket.id).emit("notify", `Sent: ${msg.text}`);
    //     return;
    //   }

    //   // Find socket id for this user, if exists
    //   const destSocket = users[msg.to];
    //   if (!destSocket) {
    //     server.to(socket.id).emit("status", msg.to + " is not active");
    //     return;
    //   }

    //   server.to(destSocket).emit("private", { ...msg, from });

    //   // Send confirmation message back to the sender (by socket id)
    //   server.to(socket.id).emit("notify", `Sent to ${msg.to}: ${msg.text}`);
    // });
  });
};

module.exports = { listen };
