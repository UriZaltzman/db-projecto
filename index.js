import express from "express";
const app = express();
const port = 3000;

const AgregarUsuario = async(_,res)=> {
    try{
        const [Usuario] = await conn.query(
            'INSERT INTO Usuario (nombre, apellido) VALUES (?, ?)'
            [req.body.nombre, req.body.apellido]
        );
        res.json({ id: result.insertId})
    }   catch (e) {
        res.status(500).json({error: e.message});
    }
};