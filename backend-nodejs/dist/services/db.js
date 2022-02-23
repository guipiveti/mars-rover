"use strict";
var knex = require('knex');
var connection = knex({
    client: 'sqlite3',
    connection: {
        filename: './src/services/database.db'
    },
    useNullAsDefault: true,
});
module.exports = connection;
/* async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://exjwnrqxsteyxb:c7434c886bec31884847447bc9ea71625668af02a0a9dd5141649d4a6a423ff4@ec2-52-73-149-159.compute-1.amazonaws.com:5432/d72edccielbvt5?ssl=true',
        ssl: { rejectUnauthorized: false }
    });

    const client = await pool.connect();

    const res = await client.query('SELECT true as connected');
    client.release();

    global.connection = pool;
    return pool.connect();
}

module.exports = {
    query: async function (query) {
        const client = await connect();
        const res = await client.query(query);
        return res.rows;
    }
} */ 
