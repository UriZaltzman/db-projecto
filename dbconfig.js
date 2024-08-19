import { Client } from 'pg';

const client = new Client({
    user: 'default',
    host: 'ep-white-dust-a4ao0h56.us-east-1.aws.neon.tech',
    database: 'wallet',
    password: '1U0hcQmxMuTz',
    port: 5432,
});

await client.connect();

export default client;