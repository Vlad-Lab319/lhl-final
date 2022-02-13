const express = require("express");
const db = require("../db/index");
const router = express.Router();

router.get("/", (req, res) => {
  db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
    res.json(users);
  });
});

// get single user
router.get("/:email", (req, res) => {
  db.query(`SELECT * FROM users WHERE email = $1;`, [req.params.email]).then(
    ({ rows: users }) => {
      res.json(users);
    }
  );
});

// get friends
router.get("/friends/:userID", (req, res) => {
  db.query(`SELECT * FROM friends WHERE user_id = $1;`, [
    req.params.userID,
  ]).then(({ rows: friends }) => {
    res.json(friends);
  });
});

module.exports = router;
