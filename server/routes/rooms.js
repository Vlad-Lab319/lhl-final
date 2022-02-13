const express = require("express");
const db = require("../db/index");
const router = express.Router();

router.get("/:userID", (req, res) => {
  db.query(`SELECT * FROM rooms WHERE user_id = $1;`, [req.params.userID]).then(
    ({ rows: rooms }) => {
      res.json(rooms);
    }
  );
});

module.exports = router;
