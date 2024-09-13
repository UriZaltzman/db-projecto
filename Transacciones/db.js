
import postgresql from 'pg';
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data/data.json');

function readData() {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    }
    return { saldo: 0, transacciones: [] };
}

function saveData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, saveData };

/*
const { Pool } = postgresql;

const client = new Pool({
    user: 'default',
    host: 'ep-white-dust-a4ao0h56.us-east-1.aws.neon.tech',
    database: 'wallet',
    password: '1U0hcQmxMuTz',
    port: 3000,
    ssl: true
});

//await client.connect();
export default client;

*/