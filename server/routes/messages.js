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

router.get("/", async (req, res) => {
  try {
    const { rows: messages } = await db.query(
      `SELECT * FROM messages ORDER BY messages.created_at;`
    );
    res.json(messages);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/private/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const { rows: privateMessages } = await db.query(
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
    res.json(privateMessages);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/seen/public/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const { rows: messagesSeen } = await db.query(
      `
    SELECT room_id, messages_seen
    FROM seen_messages
    WHERE user_id = $1
    `,
      [user_id]
    );
    res.json(messagesSeen);
  } catch (err) {
    console.log(err);
  }
});

// router.get("/private/seen/:private_room_id/:user_id", async (req, res) => {
//   const { private_room_id, user_id } = req.params;
//   try {
//     const {
//       rows: [{ id: messages_seen }],
//     } = await db.query(
//       `
//     SELECT messages_seen
//     FROM seen_messages
//     JOIN users ON seen_messages.user_id = users.id
//     JOIN private_room_users ON users.id = private_room_users.user_id
//     WHERE private_room_users.private_room_id = $1 AND seen_messages.user_id = $2
//     `,
//       [private_room_id, user_id]
//     );
//     res.json(messages_seen);
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/public/seen/:room_id/:user_id", async (req, res) => {
//   const { room_id, user_id } = req.params;
//   try {
//     const {
//       rows: [{ id: messages_seen }],
//     } = await db.query(
//       `
//     SELECT messages_seen
//     FROM seen_messages
//     JOIN users ON seen_messages.user_id = users.id
//     JOIN room_users ON users.id = room_users.user_id
//     WHERE room_users.room_id = $1 AND seen_messages.user_id = $2
//     `,
//       [room_id, user_id]
//     );
//     res.json(messages_seen);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post("/", (req, res) => {
  const { userID, channelID, room_id, message } = req.body;
  db.query(
    `INSERT INTO messages(user_id, channel_id, room_id, message)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
    [userID, channelID, room_id, message]
  )
    .then(({ rows: messages }) => {
      res.json(messages);
    })
    .catch((error) => console.log(error));
});

router.post("/private", async (req, res) => {
  const { user_id, private_room_id, message } = req.body;
  try {
    const { rows } = await db.query(
      `
      INSERT INTO private_messages (user_id, private_room_id, message) VALUES ($1, $2, $3) RETURNING*;
      `,
      [user_id, private_room_id, message]
    );
    res.json(rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/private/seen", async (req, res) => {
  const { user_id, private_room_id, messages_seen } = req.body;
  try {
    await db.query(
      `UPDATE messages_seen
      SET seen_messages = $1
      WHERE private_room_id = $2 AND user_id = $3
      `,
      [messages_seen, private_room_id, user_id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/public/seen", async (req, res) => {
  const { user_id, room_id, messages_seen } = req.body;
  try {
    const { rows } = await db.query(
      `
      UPDATE seen_messages
      SET messages_seen = $1
      WHERE user_id = $3 AND room_id = $2;
      `,
      [messages_seen, room_id, user_id]
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
