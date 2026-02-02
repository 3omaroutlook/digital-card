const { Client } = require('pg');

exports.handler = async function(event, context) {
    const params = event.queryStringParameters;
    const username = params.user || 'omar';

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    const res = await client.query("SELECT * FROM users WHERE username=$1", [username]);
    await client.end();

    if(res.rows.length === 0) {
        return { statusCode: 404, body: JSON.stringify({error:'User not found'}) };
    }

    return { statusCode: 200, body: JSON.stringify(res.rows[0]) };
}
