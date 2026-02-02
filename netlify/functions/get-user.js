import pkg from 'pg';
const { Client } = pkg;

export async function handler(event, context) {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const res = await client.query('SELECT * FROM users;');
  await client.end();

  return { statusCode: 200, body: JSON.stringify(res.rows) };
}