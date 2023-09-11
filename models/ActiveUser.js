const { knex } = require("../utils");

function addUser(userId, socketId) {
  return knex("active_users").insert({
    user_id: userId,
    socket_id: socketId,
    last_activity: new Date(),
  });
}

function removeUser(socketId) {
  return knex("active_users").where("socket_id", socketId).del();
}

function getUserSocketId(userId) {
  return knex("active_users")
    .select("socket_id")
    .where("user_id", userId)
    .first();
}

module.exports = {
  addUser,
  removeUser,
  getUserSocketId,
};
