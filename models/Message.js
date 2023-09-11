const { knex } = require("../utils");

function saveMessageDetails(data) {
  return knex("messages").insert({
    ...data,
  }, ["*"]);
}

module.exports = {
  saveMessageDetails,
};
