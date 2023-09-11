const { knex } = require("../utils");

function createNewDialogue({ title = "", type = "one_to_one" }) {
  return knex("dialogues").insert({ title, type }, ["id"]);
}

function getDialogues(userId) {
  const subquery = knex("members")
    .distinct("dialogue_id")
    .where("user_id", userId)
    .as("user_dialogues");

  return knex("dialogues")
    .select("dialogues.*")
    .select(
      knex.raw(
        `JSON_AGG(
          json_build_object('user_id', members.user_id, 'username', users.username, 'dialogue_id', members.dialogue_id, 'created_at', members.created_at, 'memeber_id', members.member_id, 'updated_at', members.updated_at
        ))
        as members`
      )
    )
    .join(
      "members",
      "dialogues.id",
      "=",
      "members.dialogue_id"
    )
    .leftJoin("users", "members.user_id", "=", "users.id")
    .join(
      subquery,
      "dialogues.id",
      "=",
      "user_dialogues.dialogue_id"
    )
    .groupBy("dialogues.id");
}

function getDialogueById(id) {
  return knex("dialogues")
    .select("dialogues.*")
    .select(
      knex.raw(
        `JSON_AGG(
          json_build_object('user_id', members.user_id, 'username', users.username, 'dialogue_id', members.dialogue_id, 'created_at', members.created_at, 'member_id', members.member_id, 'updated_at', members.updated_at
        ))
        as members`
      )
    )
    .join(
      "members",
      "dialogues.id",
      "=",
      "members.dialogue_id"
    )
    .leftJoin("users", "members.user_id", "=", "users.id")
    .where("dialogues.id", id)
    .groupBy("dialogues.id")
    .first();
}

function getDialogueMessages(dialogueId) {
  return knex("messages")
    .select("id", "content", "created_at", "sender_id", "send_by")
    .where("dialogue_id", dialogueId)
    .orderBy("created_at", "asc");
}

module.exports = {
  createNewDialogue,
  getDialogues,
  getDialogueById,
  getDialogueMessages,
};
