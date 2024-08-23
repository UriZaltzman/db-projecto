import client from "../dbconfig.js"

const Logearse = async(_,res)=> {
    try{
        const [Usuario] = await client.query(
            'SELECT FROM perfil WHERE nombre = $1 AND contrasena = $2',
            [req.body.nombre, req.body.contrasena]
        );
        res.json('Usuario logeado')
    }   catch (e) {
        res.status(500).json('La contraseña o el nombre no son correctos');
    }
};

const Usuario = {
    Logearse
};

export default Usuario;