import client from "../dbconfig.js";
import bcrypt from "bcryptjs"


const AddUserOld = async (req, res) => {
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

const AddUser = async (req, res) => {
  const { nombre, apellido, nick_name, mail, contrasena, saldo_cuenta, direccion, dni, niv_uso_tecno } = req.body;

  try {
    const queryUsuario = `
      SELECT * FROM perfil WHERE dni = $1
    `;
    const resultado = await pool.query(queryUsuario, [dni]);

    if (resultado.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'El usuario con ese DNI ya existe. Por favor, elige otro.' });
    } else {
      // Hashear la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const queryRegistro = `
        INSERT INTO perfil (nombre, apellido, nick_name, mail, contrasena, saldo_cuenta, direccion, dni, niv_uso_tecno)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
      `;
      const result = await pool.query(queryRegistro, [nombre, apellido, nick_name, mail, hashedPassword, saldo_cuenta, direccion, dni, niv_uso_tecno]);

      return res.status(201).json({ success: true, message: 'Usuario registrado correctamente', user: result.rows[0] });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al registrar el usuario.' });
  }
};


const Registro = {
    AddUser
};
export default Registro;