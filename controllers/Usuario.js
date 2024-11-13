import pool from "../dbconfig.js"
import bcrypt from "bcryptjs"
import e from "express";
import jwt from "jsonwebtoken";

/*const Logearse = async(req ,res)=> {
    try{ 
        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
        const Usuario = await pool.query(
            'SELECT mail, contrasena FROM perfil WHERE mail  = $1',
            [req.body.mail]
        );
        if (Usuario.rows.length == 1) {
            if (await bcrypt.compare(req.body.contrasena, Usuario.rows[0].contrasena))
            {
                const token = jwt.sign({ id: Usuario.rows[0].id }, "tu_secreto"/*process.env.SECRET, {
                    expiresIn: "1d",
                    });
                return res.status(200).json({ message: 'Se logeo correctamente.', token });
            }
                
            else 
                return res.status(500).json({ success: false, message: 'La contraseña o el mail son incorrecto11'});
        } else  
            return res.status(500).json({ success: false, message: 'La contraseña o el mail son incorrecto2' });
    }   catch (e) {
        console.log(e);
        res.status(500).json('La contraseña o el usuario no son correctos');
    }
    if(!Usuario){
        return res.status(400).send({status:"Error", message: "Error durante el login"})
    }
};*/

const OlvidasteContra = async(req, res) => {
    const { mail } = req.body;
    try {
        // Verificar si el email existe
        const MailCheck = await pool.query('SELECT * FROM perfil WHERE mail = $1', [mail]);

        if (MailCheck.rows.length === 0) {
            return res.status(404).json({ message: 'El correo electrónico no está registrado.' });
        }
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al enviar el correo de restablecimiento de contraseña.' });
    }
};

const Profile = async(req, res) => {
    try {
        // Consulta para obtener los datos del usuario por ID
        const query = 'SELECT id, nombre, apellido, mail, direccion, dni FROM perfil WHERE id = $1';
        const result = await pool.query(query, [req.params.id]);
        if (result.rows.length > 0) {
            return res.status(200).json({ data: result.rows[0]});
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
    } catch (error){
        console.error(error);
        return res.status(500).json({
          success: false,
          message: 'Error al obtener el perfil del usuario'
        });
    }
};

const Logearse = async(req, res) => {
    try {
        if (!req.body.mail || !req.body.contrasena) {
            return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos.' });
        }

        const Usuario = await pool.query(
            'SELECT id, mail, contrasena FROM perfil WHERE mail = $1',
            [req.body.mail]
        );

        if (Usuario.rows.length == 1) {
            const passwordMatch = await bcrypt.compare(req.body.contrasena, Usuario.rows[0].contrasena);

            if (passwordMatch) {
                const token = jwt.sign({ id: Usuario.rows[0].id }, "tu_secreto", { expiresIn: "1d" });
                return res.status(200).json({ message: 'Se logeó correctamente.', token });
            } else {
                return res.status(401).json({ success: false, message: 'La contraseña o el correo electrónico son incorrectos.' });
            }
        } else {
            return res.status(404).json({ success: false, message: 'El correo electrónico no está registrado.' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error durante el inicio de sesión.' });
    }
};



const Usuario = {
    Logearse,    
    Profile
};

export default Usuario; 