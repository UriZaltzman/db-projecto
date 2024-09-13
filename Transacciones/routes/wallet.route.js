import Router from "express";
import walletController from "../wallet.js";


const router = Router();

app.get('/saldo', walletController.getSaldo);
app.post('/transferir', walletController.transferirDinero);
app.get('/transacciones', walletController.getTransacciones);

export default router;