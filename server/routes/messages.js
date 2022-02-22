const express = require("express");
// const { send } = require("upgrade");
const db = require("../db/index");
const router = express.Router();

// router.get("/:channelID", (req, res) => {
//   db.query(`SELECT * FROM messages WHERE channel_id = $1;`, [
//     req.params.channelID,
//   ]).then(({ rows: messages }) => {
//     res.json(messages);
//   });
// });

// router.get("/:userID", (req, res) => {
//   db.query(
//     `SELECT DISTINCT(messages.*) FROM messages JOIN channels ON channels.id = messages.channel_id JOIN rooms ON channels.room_id = rooms.id JOIN room_users ON rooms.id = room_users.room_id JOIN users ON users.id = rooms.user_id WHERE users.id = $1 ORDER BY messages.created_at;`,
//     [req.params.userID]
//   ).then(({ rows: messages }) => {
//     res.json(messages);
//   });
// });

router.get("/", (req, res) => {
  db.query(`SELECT * FROM messages ORDER BY messages.created_at;`).then(
    ({ rows: messages }) => {
      res.json(messages);
    }
  );
});

router.get("/private/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const data = await db.query(
    `
    SELECT *
    FROM private_messages
    JOIN private_rooms ON private_messages.private_room_id = private_rooms.id
    WHERE private_rooms.id IN(
      SELECT private_room_users.private_room_id
      FROM private_room_users
      WHERE private_room_users.user_id = $1
    )
    ORDER BY private_messages.created_at ASC;
    `,
    [user_id]
  );
  res.json(data.rows);
});

router.post("/", (req, res) => {
  const { userID, channelID, message } = req.body;
  db.query(
    `
      INSERT INTO messages (user_id, channel_id, message) VALUES ($1, $2, $3) RETURNING *;
    `,
    [userID, channelID, message]
  )
    .then(({ rows: messages }) => {
      res.json(messages);
    })
    .catch((error) => console.log(error));
});

router.post("/private", async (req, res) => {
  const { user_id, private_room_id, message } = req.body;
  try {
    const data = await db.query(
      `
      INSERT INTO private_messages (user_id, private_room_id, message) VALUES ($1, $2, $3) RETURNING*;
      `,
      [user_id, private_room_id, message]
    );
    res.json(data.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
