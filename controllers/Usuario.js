import { conn } from "../dbconfig.js"

const AgregarUsuario = async(_,res)=> {
    try{
        const [Usuario] = await conn.query(
            'INSERT INTO Usuario (nombre) VALUES (?)'
            [req.body.nombre]
        );
        res.json({ id: result.insertId})
    }   catch (e) {
        res.status(500).json({error: e.message});
    }
};

const Usuario = {
    AgregarUsuario
};

export default Usuario;