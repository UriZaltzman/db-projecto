import postgresql from 'pg';

const { Pool } = postgresql;

const client = new Pool({
    user: 'default',
    host: 'ep-white-dust-a4ao0h56.us-east-1.aws.neon.tech',
    database: 'wallet',
    password: '1U0hcQmxMuTz',
    port: 5432,
    ssl: true
});

//await client.connect();
export default client;