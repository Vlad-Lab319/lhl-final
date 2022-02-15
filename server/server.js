// require("dotenv").config();
// const express = require("express");
// const bcrypt = require("bcryptjs");

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// const PORT = 8080;

// const usersRoutes = require("./routes/users");
// const roomsRoutes = require("./routes/rooms");
// const channelsRoutes = require("./routes/channels");
// const messagesRoutes = require("./routes/messages");

// app.use("/api/users", usersRoutes);
// app.use("/api/rooms", roomsRoutes);
// app.use("/api/channels", channelsRoutes);
// app.use("/api/messages", messagesRoutes);

// app.get("/", (req, res) => {});

// app.listen(PORT, () => {
//   console.log("App listening on port ", PORT);
// });
// ==============================================================
require("dotenv").config();
const socketServer = require("./socketServer");
const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

const PORT = 8081;

const usersRoutes = require("./routes/users");
const roomsRoutes = require("./routes/rooms");
const channelsRoutes = require("./routes/channels");
const messagesRoutes = require("./routes/messages");

app.use("/api/users", usersRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/channels", channelsRoutes);
app.use("/api/messages", messagesRoutes);

app.get("/", (req, res) => {});

const httpServer = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

socketServer.listen(httpServer);
