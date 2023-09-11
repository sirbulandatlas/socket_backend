const { knex, Validators } = require("../utils");

function findUserByEmail(email) {
  return knex("users").select("*").where("email", email).first();
}

function findUserExceptCurrent(email) {
  return knex("users").select("*").whereNot({
    email,
  });
}

function createUser({ email, name, password }) {
  return knex("users")
    .insert({
      email,
      username: name,
      password,
    })
    .returning("*");
}

function setAccessToken(userId, accessToken, refreshToken) {
  return knex("users")
    .where("id", Validators.parseInteger(userId, -1))
    .update({
      access_token: accessToken,
      refresh_token: refreshToken,
    })
    .returning("*");
}

function getAuthenticateUser(userId, email = " ", authToken) {
  return knex("users")
    .select("*")
    .where({
      email,
      id: Validators.parseInteger(userId, -1),
      access_token: authToken,
    })
    .first();
}

module.exports = {
  findUserByEmail,
  findUserExceptCurrent,
  createUser,
  setAccessToken,
  getAuthenticateUser,
};
