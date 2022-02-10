const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();

const PORT = 8080;

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});
