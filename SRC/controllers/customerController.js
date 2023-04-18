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
    res.render('Login.ejs', {alerta:false});
}
controller.isAdmin = async (req, res) => {
    req.session.ID = req.body.idForm;
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
            res.render('Login',{alerta:true, tipo:"UserIsNotAdmin"});
        }
    }
    else{
        res.render('Login',{alerta:true, tipo:"UserNoFound"});
    }
}
controller.EditUser = (req, res) => {
    res.send(`Hola que tal, aqui sera nuestra pagina para editar usuario, espero y salga el dato ${req.session.EditID}`);
}

module.exports = controller;