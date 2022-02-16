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

module.exports = router;
