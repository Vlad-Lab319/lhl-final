const express = require("express");
const db = require("../db/index");
const router = express.Router();

router.get("/:roomID", (req, res) => {
  db.query(`SELECT * FROM channels WHERE room_id = $1;`, [
    req.params.roomID,
  ]).then(({ rows: channels }) => {
    res.json(channels);
  });
});

module.exports = router;
