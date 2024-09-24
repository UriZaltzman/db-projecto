import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const Paso1 = req.headers['authorization'];
    if(!Paso1){
        return res.status(401).json({ error: 'No hay token'})
    }

    const Paso2 = Paso1.split(' ')[1];
    if (!Paso2 || Paso1.split(' ')[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Token inválido1' });
    }

    try {
        const verifiedToken = jwt.verify(Paso2, "tu_secreto"/*process.env.SECRET_KEY*/);
        req.id  = verifiedToken.id;
    } catch (error) {
        return res.status(401).json({ error11: 'Token inválido2', error });
    }

    if (!req.id) {
        return res.status(401).json({ error: 'Token inválido3' });
    }

    next();

};