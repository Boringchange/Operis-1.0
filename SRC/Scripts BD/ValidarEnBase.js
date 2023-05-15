const Controller = {};
const session = require('express-session');
const {query} = require("express");
const {HA_ERR_OLD_FILE} = require("mysql/lib/protocol/constants/errors");

//#Process

Controller.DataBaseConnection = (req, res) => {
        let connect;
        req.getConnection((err, conn) => {
            connect = conn;
        });
        return connect;
};

Controller.CheckIfExists =(req, res) => {
    return new Promise(resolve => {
        const conn = Controller.DataBaseConnection(req, res);
        const id = req.session.ID;
        const passw = req.session.Password;
        conn.query(`SELECT * FROM Personal`, (err, personal) => {
            if (err){
                console.log("No esta jalando la base de datos, te falta manos pa");
            }
            else{
                const valores = {};
                valores.existe = false;
                valores.correcta = false;
                for (let i in personal){
                    if (personal[i].idper == id){
                        console.log("Existe");
                        valores.existe = true;
                        if (personal[i].pass == passw){
                            console.log("Contra correcta");
                            valores.correcta = true;
                        }
                    }
                }
                resolve(valores);
            }
        });
    });
}
Controller.IsAlreadyAdmin = (req, res) => {
    return new Promise(resolve => {
        const conn = Controller.DataBaseConnection(req, res);
        const id = req.session.ID;
        console.log(id);
        conn.query(`SELECT * FROM Personal where idper = ${id}`, (err, personal) => {
            if (!err){
                let datoaregresar = false;
                if (personal[0].tipo_per == 'administrador'){
                    datoaregresar = true;
                    console.log('Es admin');
                }else{
                    datoaregresar = false;
                }
                resolve (datoaregresar);
            }
        });
    });
}

Controller.session = async (req, res) => {
    const condicion = await Controller.CheckIfExists(req, res);
    console.log(condicion);
}

module.exports = Controller;