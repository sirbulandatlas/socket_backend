exports.up = (knex) => {
  return knex.schema.createTable("members", (table) => {
    table.increments("member_id").primary();
    table.integer("dialogue_id").unsigned();
    table.integer("user_id").unsigned();
    table.timestamps(true, true);

    table
      .foreign("dialogue_id")
      .references("dialogues.id");
    table.foreign("user_id").references("users.id");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("members");
};
