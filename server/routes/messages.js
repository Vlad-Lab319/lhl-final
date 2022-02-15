const express = require("express");
const db = require("../db/index");
const router = express.Router();

// router.get("/:channelID", (req, res) => {
//   db.query(`SELECT * FROM messages WHERE channel_id = $1;`, [
//     req.params.channelID,
//   ]).then(({ rows: messages }) => {
//     res.json(messages);
//   });
// });

router.get("/:userID", (req, res) => {
  db.query(
    `SELECT DISTINCT(messages.*) FROM messages JOIN channels ON channels.id = messages.channel_id JOIN rooms ON channels.room_id = rooms.id JOIN room_users ON rooms.id = room_users.room_id JOIN users ON users.id = rooms.user_id WHERE users.id = $1;`,
    [req.params.userID]
  ).then(({ rows: messages }) => {
    res.json(messages);
  });
});

router.put("/messages/:id", (request, response) => {
  const { student, interviewer } = request.body.interview;

  db.query(
    `
      INSERT INTO interviews (student, interviewer_id, appointment_id) VALUES ($1::text, $2::integer, $3::integer)
      ON CONFLICT (appointment_id) DO
      UPDATE SET student = $1::text, interviewer_id = $2::integer
    `,
    [student, interviewer, Number(request.params.id)]
  )
    .then(() => {
      setTimeout(() => {
        response.status(204).json({});
        updateAppointment(Number(request.params.id), request.body.interview);
      }, 1000);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
