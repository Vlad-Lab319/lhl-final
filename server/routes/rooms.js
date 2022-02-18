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
      db.query(
        `
          INSERT INTO room_users (user_id, room_id) VALUES ($1, $2);
        `,
        [userID, rooms[0].id]
      );
    })
    .catch((error) => console.log(error));
});

router.post("/user", (req, res) => {
  const { userID, roomID } = req.body;
  db.query(
    `
    INSERT INTO room_users (user_id, room_id)
      SELECT $1, $2
    WHERE NOT EXISTS (
      SELECT 1 FROM room_users WHERE user_id=$1 AND room_id=$2
    )
    ;
    `,
    [userID, roomID]
  ).then(() => {
    res.json({});
  });
});

module.exports = router;
