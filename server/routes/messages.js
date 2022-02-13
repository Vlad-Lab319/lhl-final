const express = require("express");
const db = require("../db/index");
const router = express.Router();

router.get("/:channelID", (req, res) => {
  db.query(`SELECT * FROM messages WHERE channel_id = $1;`, [
    req.params.channelID,
  ]).then(({ rows: messages }) => {
    res.json(messages);
  });
});

module.exports = router;
