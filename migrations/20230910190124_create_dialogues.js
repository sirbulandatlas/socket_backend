exports.up = (knex) => {
  return knex.schema.createTable("dialogues", (table) => {
    table.increments("id").primary();
    table.text("title");
    table.enum("type", ["group", "one_to_one"]);
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("dialogues");
};
