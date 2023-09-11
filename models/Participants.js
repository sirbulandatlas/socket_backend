const { knex } = require("../utils");

function createRoomParticipant(participantRecords) {
  return knex("members").insert(participantRecords);
}

module.exports = {
  createRoomParticipant,
};
