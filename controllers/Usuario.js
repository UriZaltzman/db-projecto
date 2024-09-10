import pool from "../dbconfig.js"
import bcrypt from "bcryptjs"

const Logearse = async(req ,res)=> {
    try{ 
        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
        const Usuario = await pool.query(
            'SELECT mail, contrasena FROM perfil WHERE mail = $1',
            [req.body.nombre]
        );
        if (Usuario.rows.length == 1) {
            if (await bcrypt.compare(req.body.contrasena, Usuario.rows[0].contrasena))
                return res.status(200).json({ success: true, message: 'Se logeo correctamente.' });
            else 
                return res.status(500).json({ success: false, message: 'La contraseña o el mail son incorrecto11'});
        } else  
            return res.status(500).json({ success: false, message: 'La contraseña o el mail son incorrecto2' });
    }   catch (e) {
        console.log(e);
        res.status(500).json('La contraseña o el usuario no son correctos');
    }
};

const OlvidasteContra = async(req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
        
    } catch(e){
        res.status(500).json('No se pudo guardar correctamente la contraseña');
    }
};

const Usuario = {
    Logearse
};

export default Usuario; 