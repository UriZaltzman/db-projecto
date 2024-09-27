/* import pool from "../dbconfig.js";
import bcrypt from "bcryptjs"
import Usuario from "./Usuario.js";


const AddUser = async (req, res) => {
  const { nombre, apellido, mail, contrasena, direccion, dni} = req.body;
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

      const queryRegistro = `
        INSERT INTO perfil (nombre, apellido, mail, contrasena, direccion, dni)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
      `;
      const result = await pool.query(queryRegistro, [nombre, apellido, mail, hashedPassword, direccion, dni]);//usuario

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
export default Registro; */
/* 
import pool from "../dbconfig.js";
import bcrypt from "bcryptjs";
import Usuario from "./Usuario.js";

const AddUser = async (req, res) => {
  console.log("Solicitud recibida:", req.body);
  const { nombre, apellido, mail, contrasena, direccion, dni } = req.body;

  // Verificar que todos los campos estén completos
  if (!nombre || !apellido || !mail || !contrasena || !direccion || !dni) {
    return res.status(400).json({ success: false, message: 'Por favor, complete todos los campos.' });
  }

  try {
    const queryUsuario = `SELECT * FROM perfil WHERE dni = $1`;
    const resultadodni = await pool.query(queryUsuario, [dni]);

    const queryMail = `SELECT * FROM perfil WHERE mail = $1`;
    const resultadomail = await pool.query(queryMail, [mail]);

    if (resultadomail.rows.length > 0)
      return res.status(400).json({ success: false, message: 'Ya existe un usuario con ese mail.' });

    if (resultadodni.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Ya existe un usuario con ese DNI. Por favor fíjate que esté bien.' });
    } else {
      // Hashear la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      console.log("Contraseña hasheada:", hashedPassword);

      const queryRegistro = `
        INSERT INTO perfil (nombre, apellido, mail, contrasena, direccion, dni)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const result = await pool.query(queryRegistro, [nombre, apellido, mail, hashedPassword, direccion, dni]);

      return res.status(201).json({ message: 'Usuario registrado correctamente', user: result.rows[0] });
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
};

const Registro = { AddUser };
export default Registro;
 */

const AddUser = async (req, res) => {
  const { nombre, apellido, mail, contrasena, direccion, dni } = req.body;
  console.log(req.body); // Verificar datos recibidos

  try {
    const queryUsuario = `SELECT * FROM perfil WHERE dni = $1`;
    const resultadodni = await pool.query(queryUsuario, [dni]);

    const queryMail = `SELECT * FROM perfil WHERE mail = $1`;
    const resultadomail = await pool.query(queryMail, [mail]);

    if (resultadomail.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Ya existe un usuario con ese mail.' });
    }
    if (resultadodni.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Ya existe un usuario con ese DNI. Por favor fijate que este bien.' });
    } else {
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      const queryRegistro = `INSERT INTO perfil (nombre, apellido, mail, contrasena, direccion, dni) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const result = await pool.query(queryRegistro, [nombre, apellido, mail, hashedPassword, direccion, dni]);
      return res.status(201).json({ message: 'Usuario registrado correctamente', user: result.rows[0] });
    }
  } catch (error) {
    console.error('Error en AddUser:', error); // Mostrar más contexto del error
    return res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
  }
};
