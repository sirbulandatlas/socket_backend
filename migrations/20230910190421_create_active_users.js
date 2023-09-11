exports.up = (knex) => {
  return knex.schema.createTable("active_users", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.string("socket_id").notNullable();
    table.timestamp("last_activity").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("active_users");
};
