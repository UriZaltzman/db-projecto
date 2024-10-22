import { query } from "express";
import pool from "../dbconfig.js";
/*const Transaccion = async (req, res) => {
    const { nombre, apellido, saldo } = req.body
    const userid = req.user.id

    if (!nombre)
        return res.status(400).json({error: "Complete el campo del nombre de quien va a recibir la transferencia"})
    if (!apellido)
        return res.status(400).json({error: "Complete el campo del apellido de quien va a recibir la transferencia"})
    if (!saldo)
        return res.status(400).json({error: "Complete el campo con la cantidad de dinero que se va a querer mandar"})
    
    try{
        const IdTransfer = 'SELECT perfil.mail, perfil.dni, cuentas.saldo FROM perfil INNER JOIN cuentas ON perfil.id = cuentas.user_id WHERE perfil.id = $1';
        const ResultIdTransfer = await pool.query(IdTransfer, [userid]);

        if(ResultIdTransfer.rows.length === 0){
            return res.status(400).json({succes: false, message:"No se encontro la cuenta de quien lo manda"})
        }

        const remitente = ResultIdTransfer.rows[0];
        const { mail: remitenteMail, dni: remitenteDNI, saldo: remitenteSaldo} = remitente;
        if (remitenteSaldo < saldo) {
            return res.status(400).json({ success: false, message: 'Saldo insuficiente para realizar la transferencia.' });
        }

        const queryDestinatario = `SELECT perfil.id, cuentas.saldo FROM perfil INNER JOIN cuentas ON perfil.id = cuentas.user_id WHERE perfil.nombre = $1 AND perfil.apellido = $2`;
        const resultDestinatario = await pool.query(queryDestinatario, [nombre, apellido]);
    }
    catch (error) {
        // Si hay un error, hacer rollback de la transacción
        await pool.query('ROLLBACK');
        console.error("Error en la transferencia:", error);
        return res.status(500).json({ success: false, message: 'Error al realizar la transferencia.' });
    }
};
*/
const filtro = async (req, res) => {
    try{
        const { Check } = req.body
        const filtrar = 'SELECT *FROM perfil WHERE mail like $1 or dni like $1 or nombre like $1 or apellido like $1'
        const resultadoFiltro = await pool.query(filtrar, [Check]);
    
        if (resultadoFiltro.rows.length === 0){
            return res.status(400).json({succes: false, message:"No se encontro la cuenta de quien lo manda"})
        }else
        {
            return res.status(200).json({ success: true, results: resultadoFiltro[0] });
        }
    } catch (error){
        return res.status(500).json({ success: false, message: "Error en el servidor123" });
    }
}

const Transferir = async (req, res) => {

}



const Transferencias = {filtro};
export default Transferencias;