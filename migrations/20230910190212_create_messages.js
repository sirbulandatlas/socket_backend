exports.up = (knex) => {
  return knex.schema.createTable("messages", (table) => {
    table.increments("id").primary();
    table.integer("dialogue_id").unsigned();
    table.integer("sender_id").unsigned();
    table.text("send_by");
    table.text("content");
    table.integer("socket_id");
    table.timestamps(true, true);

    table.foreign("dialogue_id").references("dialogues.id");
    table.foreign("sender_id").references("users.id");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("messages");
};
