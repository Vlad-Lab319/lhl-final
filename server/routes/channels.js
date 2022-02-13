const express = require("express");
const db = require("../db/index");
const router = express.Router();

router.get("/:userID", (req, res) => {
  db.query(
    `SELECT channels.* FROM channels JOIN room_users ON channels.room_id = room_users.room_id WHERE room_users.user_id = $1;`,
    [req.params.userID]
  ).then(({ rows: channels }) => {
    res.json(channels);
  });
});

module.exports = router;
