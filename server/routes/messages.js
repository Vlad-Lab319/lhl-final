const express = require("express");
const db = require("../db/index");
const router = express.Router();

// router.get("/:channelID", (req, res) => {
//   db.query(`SELECT * FROM messages WHERE channel_id = $1;`, [
//     req.params.channelID,
//   ]).then(({ rows: messages }) => {
//     res.json(messages);
//   });
// });

router.get("/:userID", (req, res) => {
  db.query(
    `SELECT messages.* FROM messages JOIN channels ON channels.id = messages.channel_id JOIN rooms ON channels.room_id = rooms.id JOIN room_users ON rooms.id = room_users.room_id JOIN users ON users.id = rooms.user_id WHERE users.id = $1;`,
    [req.params.userID]
  ).then(({ rows: messages }) => {
    res.json(messages);
  });
});

module.exports = router;

// select messages.*
//   from messages
// join channels on channels.id = messsages.channel_id
// join rooms ON channels.room_id = rooms.id
// join room_users ON rooms.id = room_users.room_id
// join users ON users.id = room_users.user_id
// where users.id = $1
