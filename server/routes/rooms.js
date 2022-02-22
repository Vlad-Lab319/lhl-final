const express = require("express");
const db = require("../db/index");
const router = express.Router();

router.get("/members/:roomID", (req, res) => {
  db.query(
    `
    SELECT users.* FROM room_users
    JOIN users ON users.id = user_id
    WHERE room_users.room_id = $1
    ;`,
    [req.params.roomID]
  ).then(({ rows: users }) => {
    res.json(users);
  });
});

router.get("/public", (req, res) => {
  db.query(
    `
    SELECT * FROM rooms
    WHERE is_public = true
    ;`
  ).then(({ rows: rooms }) => {
    res.json(rooms);
  });
});

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

router.post("/", async (req, res) => {
  const { userID, newRoomName, description, checked, icon } = req.body;
  try {
    const { rows: rooms } = await db.query(
      `INSERT INTO rooms(user_id, name, description, is_public, icon_url) VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
      [userID, newRoomName, description, checked, icon]
    );

    await db.query(
      `INSERT INTO room_users(user_id, room_id)
      VALUES ($1, $2);`,
      [userID, rooms[0].id]
    );

    await db.query(
      `INSERT INTO seen_messages(user_id,room_id)
      VALUES($1,$2);`,
      [userID, rooms[0].id]
    );
    res.json(rooms);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/adduser", async (req, res) => {
  const { userID, roomID } = req.body;
  try {
    await db.query(
      `INSERT INTO room_users (user_id, room_id)
      SELECT $1, $2
      WHERE NOT EXISTS (
        SELECT 1 FROM room_users WHERE user_id=$1 AND room_id=$2
        );`,
      [userID, roomID]
    );
    await db.query(
      `INSERT INTO seen_messages(user_id,room_id)
      VALUES($1,$2);`,
      [userID, roomID]
    );
    res.json({});
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/edit", (req, res) => {
  const { name, id } = req.body;
  db.query(
    `UPDATE rooms SET name=$1 where id=$2;
  `,
    [name, id]
  )
    .then(() => {
      res.json({});
    })
    .catch((error) => console.log(error));
});

router.post("/delete", (req, res) => {
  const { id } = req.body;
  db.query(
    `DELETE FROM rooms where id=$1;
    `,
    [id]
  )
    .then(() => {
      res.json({});
    })
    .catch((error) => console.log(error));
});

module.exports = router;
