const { DB_URL } = require("./constants");
const { DB_NOME } = require("./constants");
const { DB_USER } = require("./constants");
const { DB_PASS } = require("./constants");
const { DB_PORT } = require("./constants");
const Poll = require("pg").Pool;

const pool = new Poll({
  user: `${DB_USER}`,
  host: `${DB_URL}`,
  database: `${DB_NOME}`,
  password: `${DB_PASS}`,
  port: `${DB_PORT}`,
});

module.exports = pool;
