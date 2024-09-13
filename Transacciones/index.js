const express = require('express');
const bodyParser = require('body-parser');
const walletController = require('./controllers/walletController');
const { getSaldo, transferirDinero, getTransacciones } = require('./wallet');

const app = express();
const port = 3000;

app.use(bodyParser.json());
/*
// Rutas
app.get('/saldo', walletController.getSaldo);
app.post('/transferir', walletController.transferirDinero);
app.get('/transacciones', walletController.getTransacciones);
*/

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => res.send("BurgerTIC API is running..."));

app.use("/saldo", getSaldo);
app.use("/transferir", transferirDinero);
app.use("/transacciones", getTransacciones);


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});