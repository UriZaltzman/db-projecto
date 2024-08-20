import client from "./dbconfig.js";


const AddUser = async (req, res) => {
    try {
        const resul = await client.query(
            'INSERT INTO perfil (nombre, apellido, nick_name, mail, contrasena, saldo_cuenta, direccion, dni, nlv_uso_tecno) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [req.body.nombre, req.body.apellido, req.body.nick_name, req.body.mail, req.body.contrasena, req.body.saldo_cuenta, req.body.direccion, req.body.dni, req.body.nlv_uso_tecno]);
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