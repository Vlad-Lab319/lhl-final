let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }

} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "postgres",
    ssl: {
      rejectUnauthorized: false
    }
  };
}

module.exports = dbParams;
