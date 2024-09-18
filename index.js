import express from "express";
import cors from "cors"; 

const app = express();
const port = 3000;

import Registro from "./controllers/Registro.js";
import Usuario from "./controllers/Usuario.js";

// Corregido: Invocar correctamente el middleware de CORS
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Wallet TIC server is working");
});

// Registro
app.post("/nuevo", Registro.AddUser);

// Logearse
app.post("/login", Usuario.Logearse);
app.get("/profile/:id", Usuario.Profile);

app.listen(port, () => {
    console.log(`Proyecto API listening at http://localhost:${port}`);
});