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