const { Client } = require('pg')

async function query(query: string) {
    const client = new Client({
        connectionString: 'postgres://postgres:postgres@postgres:5432/postgres',
    })
    await client.connect(function (err: Error) {
        if (err){console.log(err); throw err};
        console.log("Connected!");
    });
    const res = await client.query(query);
    return res.rows;
}

export { query }