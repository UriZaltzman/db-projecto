import express from 'express';
import cors from 'cors';
import Registro from './controllers/Registro.js';
import Usuario from './controllers/Usuario.js';
import Transferencias from './controllers/Transferencia.js';
import { verifyToken } from './middlewares/Usuario.middleware.js';
// import { getSaldo, transferirDinero, getTransacciones } from './controllers/wallet.js';

const app = express();
/* const port = 3000;*/
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Wallet TIC server is working");
});

// Registro
app.post("/nuevo", Registro.AddUser);
// Logearse
app.post("/login", Usuario.Logearse);
app.get("/profile/:id", verifyToken, Usuario.Profile);

// Transferencia
// app.post("/Trans", Transferencias.Transaccion);
app.get("/filtro", Transferencias.filtro);

// Uncomment these if needed
// app.use("/saldo", getSaldo);
// app.use("/transferir", transferirDinero);
// app.use("/transacciones", getTransacciones);

/* app.listen(port, () => {
    console.log(`Proyecto API listening at http://localhost:${port}`);
}); */
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
