import pool from "../dbconfig.js";
import bcrypt from "bcryptjs"
import Usuario from "./Usuario.js";


const AddUserOld = async (req, res) => {
    try {
        const resul = await client.query(
            'INSERT INTO perfil (nombre, apellido, nick_name, mail, contrasena, saldo_cuenta, direccion, dni, nlv_uso_tecno, usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [req.body.nombre, req.body.apellido, req.body.nick_name, req.body.mail, req.body.contrasena, req.body.saldo_cuenta, req.body.direccion, req.body.dni, req.body.nlv_uso_tecno, req.busuario]);
        res.json({ id: resul.insertId })
    }
    catch (err) {
        //res.status(500).json({ error: err.message });
        console.log(err.message);
    }
}

const AddUser = async (req, res) => {
const { nombre, apellido, mail, contrasena, direccion, dni /*nlv_uso_tecno*/} = req.body;

  try {
    const queryUsuario = `
      SELECT * FROM perfil WHERE dni = $1
    `;
    const resultadodni = await pool.query(queryUsuario, [dni]);

    const queryMail = `
      SELECT * FROM perfil WHERE mail = $1
    `;
    const resultadomail = await pool.query(queryMail, [mail]);

    if (resultadomail.rows.length > 0)
      return res.status(400).json({ success: false, message: 'Ya existe un usuario con ese mail.' });
    if (resultadodni.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Ya existe un usuario con ese DNI. Por favor fijate que este bien.' });
    } else {
      // Hashear la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      console.log(hashedPassword);

      const queryRegistro = `
        INSERT INTO perfil (nombre, apellido, mail, contrasena, direccion, dni)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
      `;
      const result = await pool.query(queryRegistro, [nombre, apellido, mail, hashedPassword, direccion, dni, /*nlv_uso_tecno*/]);//usuario

      return res.status(201).json({message: 'Usuario registrado correctamente', user: result.rows[0] });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Error al registrar el usuario.' });
  }
};

const Registro = {
    AddUser
};
export default Registro;