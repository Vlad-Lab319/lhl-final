const express = require("express");
const db = require("../db/index");
const router = express.Router();
const bcrypt = require("bcryptjs");
// Encrypt

// Decrypt
// bcrypt.compareSync("plaintextpassword", hashedPassword);
// returns true

router.get("/", (req, res) => {
  db.query(
    `SELECT id, username AS name, avatar_url AS avatar FROM users;`
  ).then(({ rows: users }) => {
    const updatedUsers = users.map((user) => {
      return { ...user, room_id: null, channel_id: null };
    });
    res.json(updatedUsers);
  });
});

// TODO: REMOVE - Remove for deploy
// get single user

router.get("/login/:id", (req, res) => {
  db.query(
    `SELECT id, username AS name, avatar_url AS avatar FROM users WHERE id = $1;`,
    [req.params.id]
  ).then(({ rows: users }) => {
    const user = users[0];
    res.json({
      action: {
        type: "SET_USER",
        value: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          room_id: null,
          channel_id: null,
        },
      },
    });
  });
});

router.get("/search/:name/:id", (req, res) => {
  db.query(
    `SELECT id, username AS name, avatar_url AS avatar FROM users WHERE LOWER(username) LIKE LOWER($1) AND NOT id = $2 AND username NOT IN(SELECT users.username FROM friends
    JOIN users ON friend_id = users.id
    WHERE user_id = $2
    );`,
    [req.params.name + "%", req.params.id]
  ).then((data) => {
    res.json(data.rows);
  });
});

router.get("/friends/requests/:id", (req, res) => {
  db.query(
    `
    SELECT u1.id AS fromid, u1.username AS fromname, u1.avatar_url AS fromavatar, u2.id AS toid, u2.username AS toname, u2.avatar_url AS toavatar
    FROM users u1
    JOIN friend_requests fr1 ON fr1.user_id = u1.id
    JOIN users u2 ON fr1.friend_id = u2.id
    WHERE fr1.user_id = $1 OR fr1.friend_id = $1
    `,

    [req.params.id]
  ).then((data) => {
    const formatData = data.rows.map((users) => {
      return {
        from: {
          id: users.fromid,
          name: users.fromname,
          avatar: users.fromavatar,
        },
        to: { id: users.toid, name: users.toname, avatar: users.toavatar },
      };
    });
    res.json(formatData);
  });
});

router.get("/friends/:userID", (req, res) => {
  db.query(
    `
    SELECT users.id AS id, users.username AS name, users.avatar_url AS avatar FROM users
    JOIN friends ON friends.friend_id = users.id
    WHERE friends.user_id = $1
    ;`,
    [req.params.userID]
  ).then(({ rows: friends }) => {
    res.json(friends);
  });
});

router.get("/privateroom/:user_id/:friend_id", async (req, res) => {
  const { user_id, friend_id } = req.params;
  try {
    const {
      rows: [{ id }],
    } = await db.query(
      `SELECT A.private_room_id AS id
      FROM private_room_users A, private_room_users B
      WHERE (A.user_id = $1 AND B.user_id = $2)
      AND A.private_room_id = B.private_room_id;`,
      [user_id, friend_id]
    );
    res.json({
      id: id,
      participants: [user_id, friend_id],
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const {
      rows: [{ id, username, avatar_url }],
    } = await db.query(
      `INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, avatar_url;`,
      [name, email, bcrypt.hashSync(password, 10)]
    );
    res.json({
      type: "SET_USER",
      value: {
        id: id,
        name: username,
        avatar: avatar_url,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({
      type: "SET_ERRORS",
      value:
        "Someone has already registered with that email, try a different one",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const {
      rows: [{ id, name, avatar, hashed }],
    } = await db.query(
      `SELECT id, username AS name, avatar_url AS avatar, password AS hashed FROM users WHERE email = $1;`,
      [email]
    );
    id
      ? bcrypt.compareSync(password, hashed) &&
        res.json({
          type: "SET_USER",
          value: {
            id,
            name,
            avatar,
          },
        })
      : res.json({ type: "SET_ERRORS", value: "Email/Password is incorrect" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/friends/add", async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO friend_requests (user_id, friend_id) SELECT $1,$2 WHERE NOT EXISTS(SELECT user_id, friend_id FROM friend_requests WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1 )) RETURNING *`,
      [user_id, friend_id]
    );
    rows.length ? res.sendStatus(200) : res.sendStatus(500);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/friends/delete", async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    await db.query(
      `DELETE FROM friend_requests WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1 )  RETURNING *;`,
      [user_id, friend_id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/friends/accept", async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    await db.query(
      `DELETE FROM friend_requests WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1 );`,
      [user_id, friend_id]
    );
    const {
      rows: [{ id: private_room_id }],
    } = await db.query(`INSERT INTO private_rooms VALUES(DEFAULT) RETURNING*;`);
    await db.query(
      `INSERT INTO private_room_users (user_id, private_room_id) VALUES ($1, $3), ($2, $3);`,
      [user_id, friend_id, private_room_id]
    );
    await db.query(
      `INSERT INTO friends (user_id, friend_id) VALUES($1,$2),($2,$1);`,
      [user_id, friend_id]
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
