import express from "express";
const app = express();
const port = 5432;

import Registro from "./controllers/Registro.js"
import Usuario from "./controllers/Usuario.js";

app.use(express.json());

app.get("/", (_, res) => {
    res.send("Wallet TIC server is working");
});

// Registro
app.post("/nuevo", Registro.AddUser);

// Logearse
app.get("/login", Usuario.Logearse);

app.listen(port, () => {
    console.log(`Proyecto API listening at http://localhost:${port}`);
});