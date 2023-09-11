const dbParameters = require("../knexfile");
const knex = require("knex")(dbParameters);

const { attachPaginate } = require("knex-paginate");
attachPaginate();

module.exports = knex;
