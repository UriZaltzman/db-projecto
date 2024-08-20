import client from "./dbconfig.js";


const AddUser = async (req, res) => {
    try {
        const resul = await client.query(
            'INSERT INTO Usuario2 (nombre, apellido) VALUES ($1, $2) RETURNING *',
            [req.body.nombre, req.body.apellido]);
        res.json({ id: resul.insertId })
    }
    catch (err) {
        //res.status(500).json({ error: err.message });
        console.log(err.message);
    }
}

const Registro = {
    AddUser
}

export default Registro;