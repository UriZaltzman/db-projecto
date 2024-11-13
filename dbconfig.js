import postgresql from 'pg';

const { Pool } = postgresql;

const client = new Pool({
    user: 'default',
    host: 'ep-frosty-smoke-a4d9wboh.us-east-1.aws.neon.tech',
    database: 'wallet',
    password: 'SMQD5quWLsh2',
    port: 5432,
    ssl: true
});

//await client.connect();
export default client;


function readData() {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    }
    return { saldo: 0, transacciones: [] };
}