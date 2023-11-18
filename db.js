const  Pool  = require("pg").Pool;

const pool = new Pool({
    user: "playabook",
    password: "8896",
    host: "localhost",
    port: 5432,
    database: "rate",
});

module.exports = pool;
