require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 8080;

const usersRoutes = require("./routes/users");

app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});
