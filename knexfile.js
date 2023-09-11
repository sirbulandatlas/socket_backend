const config = require("config");

module.exports = {
  client: "pg",
  connection: config.databaseConnectionString,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
