const controller = {};
const validar = require('../Scripts BD/ValidarEnBase');
const e = require("express");

controller.RedOperis = (req, res) => {
    res.redirect(`/Operis`);
}
controller.inicio = (req, res) => {
    res.render('index');
    console.log("Hola");
    console.log(req.body.session);
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
                console.log("Es el jefazo");
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
        res.redirect('/Operis/direct');
    }

}
controller.CreateUser = async (req, res) => {
    if (req.session.tipo == "administrador"){
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`INSERT INTO Personal VALUES (DEFAULT,'${req.body.NewUser}','${req.body.NewPass}', '${req.body.NewTypeUser}', ${req.body.NewTypeSalary}, '${req.body.NewTelUser}')`, (err) => {
            if (!err){
                res.redirect("/Operis/Empleados");
            }
            else{
                res.send(err);
            }
        });
    }

}
controller.EditUserSection = async (req, res) => {
    console.log(req.session.tipo);
    if (req.session.tipo == "administrador"){
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Personal where idper = ${req.body.IdToEdit}`, (err, PerEdit) => {
            if (err){
                console.log(err);
                res.send(err);
            }
            else{
                console.log(PerEdit);
                res.render("CambioUser.ejs", {Personal: PerEdit});
            }
        });
    }
    else{
        res.send("No es admin");
    }
}
controller.EditUser = async (req, res) => {
    const conn = await validar.DataBaseConnection(req, res);

    console.log(req.body);

    conn.query(`UPDATE Personal SET nom_per = '${req.body.NewName}',pass = '${req.body.NewPassword}', tipo_per = '${req.body.NewType}', sueldo_per = ${req.body.NewSalary}, tel_per = '${req.body.NewTel}' where idper = ${req.body.IdEdit}`, err => {
        if (err) {
            res.send(err);
        }
        res.redirect("/Operis/Empleados");
    });
}

    controller.DeleteUser = (req, res) => {
        const conn = validar.DataBaseConnection(req, res);
        conn.query(`DELETE FROM Personal WHERE idper = ${req.body.IdToDelete}`, err => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/Operis/Empleados");
            }
        });

    }
    controller.paqueteriaAlmac = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Paquete where estado_paq = 'Dentro_centro'`, (err, Paquetes) => {
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
        conn.query(`INSERT INTO Paquete VALUES (${req.body.IdPaquete}, '${req.body.TipoPaq}','${req.body.FechaLlegada}','${req.body.FechaSalida}','Dentro_centro','${req.body.DicEnt}','${req.body.Descripcion}')`, err =>{
            if (err){
                res.send(err);
            } else {
                res.redirect("/Operis/PaqueteriaAlm");
            }
        });

    }
    controller.DeletePaq = async (req, res) =>{
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`DELETE FROM Paquete WHERE idpaq = ${req.body.PaqToDelete}`, err => {
            if (err){
                res.send(err);
            } else {
                res.redirect('/Operis/PaqueteriaAlm');
            }
        });
    }
    controller.DeletePaq2 = async (req, res) =>{
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`DELETE FROM Paquete WHERE idpaq = ${req.body.PaqToDelete}`, err => {
            if (err){
                res.send(err);
            } else {
                res.redirect('/Operis/PaqueteriaAlm/ConsultPaq');
            }
        });
    }
    controller.MarkExit = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`UPDATE Paquete SET estado_paq = 'Fuera_centro' WHERE ${req.body.IdExit}`, err =>{
            if (err){} else{
                res.redirect(`/Operis/PaqueteriaAlm`);
            }
        });
    }
    controller.EditPaqSection = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Paquete where idpaq = ${req.body.PaqToEdit}`, (err, paquete) => {
            if (err){
                res.send(err);
            }
            else {
                res.render('ModificacionPaquete', {paq:paquete});
            }
        });
    }
    controller.EditPaq = async (req, res) => {
        const conn = validar.DataBaseConnection(req, res);
        conn.query(`UPDATE Paquete SET indate = '${req.body.NewComeDay}', outdate = '${req.body.NewExitDay}', desc_paq = '${req.body.des}' where idpaq = ${req.body.IdPaq}`, err => {
            if (err){
                res.send(err);
            } else{
                res.redirect('/Operis/PaqueteriaAlm');
            }
        });
    }
    controller.ConsultPaq = async (req, res) =>{
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Paquete`, (err, paquete) => {
            res.render('ConsultaPaquetes.ejs',{paq:paquete});
        });
    }
    controller.DispCyber = async (req, res) =>{
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Computadora`, (err, computadoras) => {
            if (err){
                res.send(err);
            } else {
                conn.query(`SELECT * FROM Renta_comp`, (err, renta_comp) => {
                    if (err){
                        res.send(err);
                    } else {
                        conn.query(`SELECT * FROM Renta`, (err, renta) => {
                            if (err){
                                res.send(err);
                            } else {
                                console.log(renta);
                                res.render("DisponibilidadCyber", {comp:computadoras, rentcomp: renta_comp, rent:renta});
                            }
                        });
                    }
                });
            }
        });
    }
    controller.EquiposCyber = async (req, res)=>{
        const conn = validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM COMPUTADORA`, (err, computadoras) => {
            if (err){
                res.send(err);
            } else{
                console.log(computadoras);
                res.render('EquiposCyber.ejs', {comp:computadoras});
            }
        });
    }
    controller.startRent = async (req, res) => {
        const conn = validar.DataBaseConnection(req, res);
        var currentTime = new Date();
        let horif = `${currentTime.getHours()}`;
        let minif = `${currentTime.getMinutes()}`;
        if (parseInt(horif)<10){
            horif = `0`+`${horif}`;
        } else{}
        if (parseInt(minif)<10){
            minif = `0`+`${minif}`;
        }
        conn.query(`INSERT INTO Renta VALUES (default, '${horif}:${minif}', DEFAULT, DEFAULT, '${currentTime.getDate()}/${currentTime.getMonth()+1}/${currentTime.getFullYear()}')`);
        await conn.query(`SELECT * FROM Renta`, (err, renta) => {
            let idrenta;
            for (let i in renta){
                idrenta = renta[i].id_rent;
            }
            conn.query(`INSERT INTO Renta_comp VALUES (${idrenta}, ${req.body.IdSaveComp})`);
        });
        res.redirect(`/Operis/CyberDisp`);
    }
    controller.EndRent = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        console.log(req.body.hr1);
        conn.query(`UPDATE Renta SET hr_sal='${req.body.hr1}', cost_tot=${req.body.ToPagar} where id_rent=${req.body.RentID}`);
        res.redirect("/Operis/CyberDisp");
    }
    controller.DelEquipo = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`DELETE FROM Computadora WHERE idcomp = ${req.body.iddel}`);
        res.redirect(`/Operis/CyberDisp/GestionEquipos`);
    }
    controller.EditEquipo = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`UPDATE Computadora SET hr_compu = '${req.body.hrnew}' where idcomp = ${req.body.idmod}`);
        res.redirect(`/Operis/CyberDisp/GestionEquipos`);
    }
    controller.AddEqui = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        const hora = `$${req.body.hrnew}/30min`;
        conn.query(`INSERT INTO Computadora VALUES (default, '${hora}')`);
        res.redirect(`/Operis/CyberDisp/GestionEquipos`);
    }
    controller.VentaPape = async (req, res) =>{
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Producto`, (err, producto) => {
            if (err){
                res.send(err);
            } else{
                res.render('VentaPapeleria.ejs',{product:producto});
            }
        });
    }
    controller.CompleteSell = (req, res) => {
        var conn = validar.DataBaseConnection(req, res);
        var date = new Date();
        var fecha    = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        console.log(fecha);
        conn.query(`SELECT * FROM Vender`, async (err, ventas) => {
            console.log(ventas.length);
            var num = ventas.length;
            var Prodcutos = req.body.confirmar.split("|");
            console.log(Prodcutos);
            for (let i in Prodcutos){
                num = num + 1;
                var Producto = Prodcutos[i].split("/");
                console.log(Producto);
                console.log(`${Producto[0]}, el otro dato ,${Producto[1]}`);
                console.log(num);
                const a = await validar.AddVenta(req, res, num, req.session.ID, Producto[0], Producto[1], `${fecha}`);
            }
            res.redirect("/Operis/VentaPape");
        });
    }
    controller.InventPape = async (req, res) =>{
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Producto`, (err, producto) => {
            if (err){
                res.send(err);
            }else{
                res.render('InventarioPapeleria.ejs', {product: producto});
            }
        });
    }
    controller.AddProduct = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`INSERT INTO Producto VALUES (DEFAULT, '${req.body.ProductName}', ${req.body.ProductStack}, ${req.body.BasePrize}, ${req.body.SellPrize})`, err => {
            if (err){
                res.send(err);
            } else{
                res.redirect("/Operis/InventPape");
            }
        });
    }
    controller.EditProduct = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`UPDATE Producto SET nom_produ = '${req.body.EditName}', unidades_disp = ${req.body.EditStack} , padq_produ = ${req.body.EditBasePrize}, pvent_produ = ${req.body.EditSellPrize} WHERE idprodu = ${req.body.EditID}`, err => {
            if (err){
                console.log(err)
            } else {
                res.redirect("/Operis/InventPape");
            }
        });
    }
    controller.DeleteProduct = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`DELETE FROM Producto WHERE idprodu = ${req.body.DeleteId}`, err => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/Operis/InventPape");
            }
        });
    }
    controller.AddAbast = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`INSERT INTO Abastecedor VALUES (DEFAULT, '${req.body.nom}', '${req.body.tel}')`, err => {
            if (err){
                res.send(err);
            } else {
                res.redirect("/Operis/ReabastPape");
            }
        });
    }
    controller.EditAbast = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`UPDATE Abastecedor SET nom_abast = '${req.body.name}', tel_abast = '${req.body.tel}' WHERE idabast = ${req.body.id}`, err => {
            if (err){
                res.send(err);
            } else{
                res.redirect("/Operis/ReabastPape");
            }
        });
    }
    controller.DelteAbast = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`DELETE FROM Abastecedor WHERE idabast = ${req.body.id}`, err => {
            if (err){
                res.send(err);
            } else{
                res.redirect("/Operis/ReabastPape");
            }
        });
    }
    controller.ReabastPape = async (req, res)=>{
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Abastecedor`, (err, abastecedor) => {
            if (err){
                res.send(err);
            } else {
                conn.query(`SELECT * FROM Producto`, (err, producto) => {
                    if (err){
                        res.send(err);
                    } else {
                        conn.query(`SELECT * FROM Prod_Abast`, (err, proabs) => {
                            if (err){
                                console.log(err);
                            } else {
                                res.render('ReabastecimientoPapeleria.ejs', {abas:abastecedor, pro:producto, proab:proabs});
                            }
                        });
                    }
                });
            }
        });
    }
    controller.AltaAbasPro = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`INSERT INTO Prod_abast VALUES (${req.body.idpro}, ${req.body.idaba})`, err => {
            if (err){
                res.send(err);
            } else {
                res.redirect("/Operis/ReabastPape");
            }
        });
    }
    controller.BajaAbasPro = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        const datos = req.body.data.split("|");
        conn.query(`DELETE FROM Prod_Abast WHERE idprodu = ${datos[0]} AND idabast = ${datos[1]}`, err => {
            if (err){
                res.send(err);
            } else {
                res.redirect("/Operis/ReabastPape");
            }
        });
    }
    controller.PresDia = async (req, res) =>{
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Vender`, (err, vender) => {
            if (err){
                res.send(err);
            } else {
                conn.query(`SELECT * FROM Producto`, (err, producto) => {
                    if (err){
                        res.send(err);
                    } else {
                        conn.query(`SELECT * FROM Renta`, (err, renta) => {
                            if (err){
                                res.send(err);
                            } else{
                                conn.query(`SELECT * FROM Presupuesto`, (err, presupuesto) => {
                                    if (err){
                                        res.send(err);
                                    } else {
                                        res.render('PresupuestoDia.ejs', {ven:vender, pro:producto, ren:renta, pre:presupuesto});
                                    }
                                });
                            }
                        })
                    }
                });
            }
        });

    }
    controller.ClosePresupuesto = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        const datos = req.body.datos.split("|");
        conn.query(`INSERT INTO Presupuesto VALUES (DEFAULT, '${datos[0]}', ${datos[1]}, ${datos[2]}, ${datos[3]})`, err => {
            if (err){
                res.send(err);
            } else {
                res.redirect("/Operis/PresupuestoDiario");
            }
        });
    }
    controller.ConsPres = async (req, res) =>{
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`SELECT * FROM Presupuesto`, (err, presupuesto) => {
            if (err){
                res.send(err);
            } else {
                res.render('ConsultaPresupuestos.ejs', {pre:presupuesto});
            }
        });
    }
    controller.EditPre = async (req, res) => {
        const conn = await validar.DataBaseConnection(req,res);
        conn.query(`UPDATE Presupuesto SET gan_pres = ${req.body.ganancias}, ingreso_pres = ${req.body.ingresos}, gastos_pres = ${req.body.gastos} WHERE idpres = ${req.body.idpres}`, err => {
            if (err){
                res.send(err);
            } else {
                res.redirect("/Operis/ConsultaPresupuesto");
            }
        });
    }
    controller.DelPre = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`DELETE FROM Presupuesto WHERE idpres = ${req.body.idpres}`, err => {
            if (err){
                res.send(err);
            } else {
                res.redirect("/Operis/ConsultaPresupuesto");
            }
        });
    }
    controller.AddPre = async (req, res) => {
        const conn = await validar.DataBaseConnection(req, res);
        conn.query(`INSERT INTO Presupuesto VALUES (DEFAULT, '${req.body.dia}', ${req.body.gan}, ${req.body.ingreso}, ${req.body.gastos})`, err => {
            if (err){
                res.send(err);
            } else {
                res.redirect("/Operis/ConsultaPresupuesto");
            }
        });
    }
module.exports = controller;