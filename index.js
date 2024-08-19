import express from "express";
const app = express();
const port = 3000;

import Usuario from "/controllers/Usuario.js"

app.use(express.json());

app.get("/", (_, res) => {
    res.send("SpoTICfy API working!");
});

app.post("/nuevo", Usuario.AgregarUsuario);

app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});