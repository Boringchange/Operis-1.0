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
controller.EditUser = (req, res) => {
    res.send(`Hola que tal, aqui sera nuestra pagina para editar usuario, espero y salga el dato ${req.body.IdToEdit}`);
}
controller.paqueteriaAlmac = (req, res) =>{
    res.render('Paqueteria_Almacen.ejs');
}

module.exports = controller;