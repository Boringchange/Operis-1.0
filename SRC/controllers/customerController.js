const controller = {};
const validar = require('../Scripts BD/ValidarEnBase');
const e = require("express");

controller.inicio = (req, res) => {
    res.render('index');
};
controller.operisDirect =async (req, res) => {
    if (req.session.ID === undefined){
        req.session.ID = req.body.idForm;
        req.session.Password = req.body.password;
    } else{
    }
    const valores = await validar.CheckIfExists(req, res);
    console.log(`ID: ${valores.existe}, Contraseña: ${valores.correcta}`);
    if (valores.existe){
        if (valores.correcta){
            const IsTheBoss = await validar.IsAlreadyAdmin(req, res);
            console.log(IsTheBoss);
            if (IsTheBoss){
                req.session.tipo = "administrador";
                res.render('Operis_direct', {tipo: req.session.tipo});
            }else{
                const conn = validar.DataBaseConnection(req, res);
                conn.query(`SELECT * FROM Personal where${req.session.ID}`, (err, personal) => {
                    if (!err){
                        req.session.tipo = personal[0].tipo_per;
                        res.render('Operis_direct',{tipo: req.session.tipo});
                    }
                });
            }
        }
        else{
            req.session.ID = undefined;
            res.render('Login',{alerta:true, tipo:"PasswordIncorrect"});
        }
    }
    else{
        req.session.ID = undefined;
        res.render('Login',{alerta:true, tipo:"UserNoFound"});
    }
}
controller.empleados = (req, res) => {
    req.session.ID = undefined;
    res.render('Login.ejs', {alerta:false});
}
controller.isAdmin = async (req, res) => {
    if (req.session.tipo == "administrador"){
        const conn = validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Personal`, (err, personal) => {
            if (!err){
                res.render('GestionUsuario',{datos:personal});
            }
        });
    } else {
        res.redirect('/direct');
    }

}
controller.CreateUser = async (req, res) => {
    if (req.session.tipo == "administrador"){
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

}
controller.EditUserSection = (req, res) => {
    if (req.session.tipo == "administrador") {
        res.render("CambioUser.ejs", {idtoedit: req.body.IdToEdit});
    }
}
controller.EditUser = async (req, res) => {
    const conn = await validar.DataBaseConnection(req, res);
    conn.query(`UPDATE Personal SET nom_per = '${req.body.NewName}', tipo_per = '${req.body.NewType}', sueldo_per = ${req.body.NewSalary} where idper = ${req.body.IdEdit}`, err => {
        if (err) {
            res.send(err);
        }
        res.redirect("/Empleados");
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
    controller.AddPaqSection = (req, res) => {
        res.render("RegistroPaquete.ejs");
    }
    controller.AddPaq = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`INSERT INTO Paquete VALUES (${req.body.IdPaquete}, '1','${req.body.FechaLlegada}','${req.body.FechaSalida}','1','1','${req.body.Descripcion}')`, err =>{
            if (err){
                res.send(err);
            }
            conn.query(`INSERT INTO Paq_cli VALUES (${req.body.IdPaquete},'${req.body.IdDelDestinatario}')`, err => {
                if (err){
                    res.send(err);
                } else {
                    res.redirect("/PaqueteriaAlm");
                }
            });
        });

    }
    controller.DeletePaq = async (req, res) =>{
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`DELETE FROM Paquete WHERE idpaq = ${req.body.PaqToDelete}`, err => {
            if (err){
                res.send(err);
            } else {
                res.redirect('/PaqueteriaAlm');
            }
        });
    }
module.exports = controller;