import express from "express";
const app = express();
const port = 5432;

import Registro from "./Registro.js"

app.use(express.json());

app.get("/", (_, res) => {
    res.send("SpoTICfy API working!");
});

app.post("/nuevo", Registro.AddUser);

app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});