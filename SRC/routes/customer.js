const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.RedOperis);
router.get('/Operis', customerController.inicio);
router.get('/Operis/Login', customerController.empleados);
router.get('/Operis/direct', customerController.operisDirect);
router.post('/Operis/direct', customerController.operisDirect);
router.post('/Operis/Empleados', customerController.isAdmin);
router.get('/Operis/Empleados', customerController.isAdmin);
router.post('/Operis/Empleados/Create', customerController.CreateUser);
router.post('/Operis/Empleados/EditUserSection', customerController.EditUserSection);
router.post('/Operis/Empleados/EditUser', customerController.EditUser);
router.post('/Operis/Empleados/DeleteUser', customerController.DeleteUser);
router.get('/Operis/PaqueteriaAlm', customerController.paqueteriaAlmac);
router.get('/Operis/PaqueteriaAlm/AddSection', customerController.AddPaqSection);
router.post('/Operis/PaqueteriaAlm/AddPaq', customerController.AddPaq);
router.post('/Operis/PaqueteriaAlm/DeletePaq', customerController.DeletePaq);
router.post('/Operis/PaqueteriaAlm/MarkExit', customerController.MarkExit);
router.post('/Operis/PaqueteriaAlm/DeletePaq2', customerController.DeletePaq2);
router.post('/Operis/PaqueteriaAlm/EditPaqSection', customerController.EditPaqSection);
router.post('/Operis/PaqueteriaAlm/EditPaq', customerController.EditPaq);
router.get('/Operis/PaqueteriaAlm/ConsultPaq', customerController.ConsultPaq);
router.get('/Operis/CyberDisp', customerController.DispCyber);
router.post('/Operis/CyberDisp/StartRent', customerController.startRent);
router.post('/Operis/CyberDisp/EndRent', customerController.EndRent);
router.get('/Operis/CyberDisp/GestionEquipos', customerController.EquiposCyber);
router.post('/Operis/CyberDisp/GestionEquipos/DelEqui', customerController.DelEquipo);
router.post('/Operis/CyberDisp/GestionEquipos/ModEqui', customerController.EditEquipo);
router.post('/Operis/CyberDisp/GestionEquipos/AddEqui', customerController.AddEqui);
router.get('/Operis/VentaPape', customerController.VentaPape);
router.post('/Operis/VentaPape/SellComplete', customerController.CompleteSell);
router.get('/Operis/InventPape', customerController.InventPape);
router.post('/Operis/InventPape/AddProduct', customerController.AddProduct);
router.post('/Operis/InventPape/EditProduct', customerController.EditProduct);
router.post('/Operis/InventPape/DeleteProduct', customerController.DeleteProduct);
router.get('/Operis/ReabastPape', customerController.ReabastPape);
router.post('/Operis/ReabastPape/AddAbast', customerController.AddAbast);
router.post('/Operis/ReabastPape/EditAbast', customerController.EditAbast);
router.post('/Operis/ReabastPape/DeleteAbast', customerController.DelteAbast);
router.post('/Operis/ReabastPape/AddAbaPro', customerController.AltaAbasPro);
router.post('/Operis/ReabastPape/DelAbaPro', customerController.BajaAbasPro);
router.get('/Operis/PresupuestoDiario', customerController.PresDia);
router.post('/Operis/PresupuestoDiario/ClosePres', customerController.ClosePresupuesto);
router.get('/Operis/ConsultaPresupuesto', customerController.ConsPres);
router.post('/Operis/ConsultaPresupuesto/EditPre', customerController.EditPre);
router.post('/Operis/ConsultaPresupuesto/DelPre', customerController.DelPre);
router.post('/Operis/ConsultaPresupuesto/AddPre', customerController.AddPre);

module.exports = router;