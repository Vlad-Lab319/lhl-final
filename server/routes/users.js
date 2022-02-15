const express = require("express");
const db = require("../db/index");
const router = express.Router();

router.get("/", (req, res) => {
  db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
    res.json(users);
  });
});

// get single user
router.get("/:id", (req, res) => {
  db.query(
    `SELECT id, username AS name, avatar_url AS avatar FROM users WHERE id = $1;`,
    [req.params.id]
  ).then(({ rows: users }) => {
    res.json(users[0]);
  });
});

// get friends
router.get("/friends/:userID", (req, res) => {
  db.query(`SELECT * FROM friends WHERE user_id = $1;`, [
    req.params.userID,
  ]).then(({ rows: friends }) => {
    res.json(friends);
  });
});

// TODO: get all distinct users from the users table that are in the same rooms as the current logged in user

// TODO: Login will need to get a user by email and password they enter, that password will need to be compared against the hashed password (check INFO.md for directions)

module.exports = router;
