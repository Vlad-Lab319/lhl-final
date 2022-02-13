const express = require("express");
const db = require("../db/index");
const router = express.Router();

router.get("/", (req, res) => {
  db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
    res.json(users);
  });
});

module.exports = router;
