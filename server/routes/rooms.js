const express = require("express");
const db = require("../db/index");
const router = express.Router();

router.get("/:userID", (req, res) => {
  db.query(
    `
    SELECT rooms.* FROM rooms 
    JOIN room_users ON rooms.id = room_id
    WHERE room_users.user_id = $1
    ;`,
    [req.params.userID]
  ).then(({ rows: rooms }) => {
    res.json(rooms);
  });
});

router.post("/", (req, res) => {
  const { userID, newRoomName, icon } = req.body;
  db.query(
    `
      INSERT INTO rooms (user_id, name, icon_url) VALUES ($1, $2, $3) RETURNING *;
    `,
    [userID, newRoomName, icon]
  )
    .then(({ rows: rooms }) => {
      res.json(rooms);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
