const { Pool } = require("pg");
const dbParams = require("../lib/db.js");

const pool = new Pool(dbParams);

pool.connect((err, client) => {
  if (!err) {
    console.log("DB in db.index.js connected.\nClient => ", client.user);
    console.log("DB =====> ", client.database);
  } else {
    console.log("Error: ", err);
  }
});

const query = (queryString, queryParams) => {
  console.log("Query String =================>\n", queryString);
  console.log("Query Params =================>\n", queryParams);
  return pool.query(queryString, queryParams);
};

module.exports = {
  query,
};

// TODO: It would be nice to have some more seeds for the db, but don't waste alot of time on it
