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

router.post("/", (req, res) => {
  const { roomID, newChannelName } = req.body;
  db.query(
    `
      INSERT INTO channels (room_id, name) VALUES ($1, $2) RETURNING *;
    `,
    [roomID, newChannelName]
  )
    .then(({ rows: channels }) => {
      res.json(channels);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
