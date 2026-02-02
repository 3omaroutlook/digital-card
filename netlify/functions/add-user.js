import pkg from 'pg';
const { Client } = pkg;

export async function handler(event, context) {
  if(event.httpMethod !== 'POST') 
    return { statusCode: 405, body: 'Method Not Allowed' };

  const user = JSON.parse(event.body);

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const query = `
    INSERT INTO users(username,name,phone,email,instagram,whatsapp,image)
    VALUES($1,$2,$3,$4,$5,$6,$7)
    ON CONFLICT (username)
    DO UPDATE SET name=$2,phone=$3,email=$4,instagram=$5,whatsapp=$6,image=$7
  `;

  await client.query(query, [
    user.username, user.name, user.phone, user.email,
    user.instagram, user.whatsapp, user.image
  ]);

  await client.end();

  return { statusCode: 200, body: JSON.stringify({message:'User added/updated successfully'}) };
}