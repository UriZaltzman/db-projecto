import pool from "../dbconfig.js"
import bcrypt from "bcryptjs"

const Logearse = async(req ,res)=> {
    try{ 
        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
        const Usuario = await pool.query(
            'SELECT usuario, contrasena FROM perfil WHERE usuario = $1',
            [req.body.nombre]
        );
        if (Usuario.rows.length == 1) {
            if (await bcrypt.compare(req.body.contrasena, Usuario.rows[0].contrasena))
                return res.status(200).json({ success: true, message: 'Se logeo correctamente.' });
            else 
                return res.status(500).json({ success: false, message: 'La contraseña o el usuario son incorrecto11'});
        } else  
            return res.status(500).json({ success: false, message: 'La contraseña o el usuario son incorrecto2' });
    }   catch (e) {
        console.log(e);
        res.status(500).json('La contraseña o el usuario no son correctos');
    }
};

const Usuario = {
    Logearse
};

export default Usuario; 