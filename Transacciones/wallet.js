const { readData, saveData } = require('../db');

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