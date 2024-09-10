const express = require('express');
const bodyParser = require('body-parser');
const walletController = require('./controllers/walletController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rutas
app.get('/saldo', walletController.getSaldo);
app.post('/transferir', walletController.transferirDinero);
app.get('/transacciones', walletController.getTransacciones);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});