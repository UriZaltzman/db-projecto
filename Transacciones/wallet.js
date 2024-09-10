/*const { readData, saveData } = require('../db');

const getSaldo = (req, res) => {
    const data = readData();
    res.json({ saldo: data.saldo });
};

const transferirDinero = (req, res) => {
    const { monto, descripcion } = req.body;
    const data = readData();

    if (monto > 0) {
        data.saldo += monto;
        data.transacciones.push({
            tipo: 'recepción',
            monto,
            descripcion,
            fecha: new Date().toISOString()
        });
        saveData(data);
        res.json({ mensaje: 'Transferencia realizada con éxito', saldo: data.saldo });
    } else {
        res.status(400).json({ mensaje: 'Monto inválido' });
    }
};

const getTransacciones = (req, res) => {
    const data = readData();
    res.json(data.transacciones);
};

module.exports = { getSaldo, transferirDinero, getTransacciones };
*/

const { readData, saveData } = require('../db');

// Obtiene el saldo actual
const getSaldo = (req, res) => {
    const data = readData();
    res.json({ saldo_cuenta: data.saldo_cuenta });
};

// Realiza una transferencia de dinero
const transferirDinero = (req, res) => {
    const { transferencia, alias, cvu, descripcion } = req.body;
    const data = readData();

    if (transferencia > 0) {
        // Se supone que 'recibir' es el monto recibido y se añade al saldo actual
        data.saldo_cuenta += transferencia;

        // Agrega la transacción a la lista
        data.transacciones.push({
            tipo: 'recepción',
            monto: transferencia,
            alias,
            cvu,
            hora_fecha: new Date().toISOString()
        });

        // Guarda los cambios en la base de datos
        saveData(data);
        res.json({ mensaje: 'Transferencia realizada con éxito', saldo_cuenta: data.saldo_cuenta });
    } else {
        res.status(400).json({ mensaje: 'Monto inválido' });
    }
};

// Obtiene todas las transacciones
const getTransacciones = (req, res) => {
    const data = readData();
    res.json(data.transacciones);
};

module.exports = { getSaldo, transferirDinero, getTransacciones };