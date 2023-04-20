const controller = {};
const validar = require('../Scripts BD/ValidarEnBase');
const e = require("express");

controller.inicio = (req, res) => {
    res.render('index');
};
controller.operisDirect = (req, res) => {
    res.render('Operis_direct');
}
controller.empleados = (req, res) => {
    req.session.ID = undefined;
    res.render('Login.ejs', {alerta:false});
}
controller.isAdmin = async (req, res) => {
    console.log(`Hola chavales, ${req.session.ID}`);
    if (req.session.ID === undefined){
        req.session.ID = req.body.idForm;
    } else{
    }
    const exist = await validar.CheckIfExists(req, res);
    if (exist){
        const IsTheBoss = await validar.IsAlreadyAdmin(req, res);
        console.log(IsTheBoss);
        if (IsTheBoss){
            const conn = validar.DataBaseConnection(req, res);
            conn.query(`SELECT * FROM Personal`, (err, personal) => {
                if (!err){
                    res.render('GestionUsuario',{datos:personal});
                }
            });
        }else{
            req.session.ID = undefined;
            res.render('Login',{alerta:true, tipo:"UserIsNotAdmin"});
        }
    }
    else{
        req.session.ID = undefined;
        res.render('Login',{alerta:true, tipo:"UserNoFound"});
    }
}
controller.CreateUser = async (req, res) => {
    const conn = await validar.DataBaseConnection(req, res);
    conn.query(`INSERT INTO Personal VALUES (DEFAULT, '${req.body.NewUser}', '${req.body.NewTypeUser}', ${req.body.NewTypeSalary}, '${req.body.NewTelUser}')`, (err) => {
        if (!err){
            res.redirect("/Empleados/Menu");
        }
        else{
            res.send(err);
        }
    });
}
controller.EditUserSection = (req, res) => {
    res.render("CambioUser.ejs",{idtoedit: req.body.IdToEdit});
}
controller.EditUser = async (req, res) => {
    const conn = await validar.DataBaseConnection(req, res);
    conn.query(`UPDATE Personal SET nom_per = '${req.body.NewName}', tipo_per = '${req.body.NewType}', sueldo_per = ${req.body.NewSalary} where idper = ${req.body.IdEdit}`, err => {
        if (err) {
            res.send(err);
        }
        res.redirect("/Empleados/Menu");
    });
}

    controller.DeleteUser = (req, res) => {
        const conn = validar.DataBaseConnection(req, res);
        conn.query(`DELETE FROM Personal WHERE idper = ${req.body.IdToDelete}`, err => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/Empleados/Menu");
            }
        });

    }
    controller.paqueteriaAlmac = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Paquete`, (err, Paquetes) => {
            if (err) {
                res.send(err);
            }
            res.render('Paqueteria_Almacen.ejs', {paquetes: Paquetes});
        });
    }
module.exports = controller;