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
router.post('/Operis/PaqueteriaAlm/EditPaqSection', customerController.EditPaqSection);
router.post('/Operis/PaqueteriaAlm/EditPaq', customerController.EditPaq);
router.get('/Operis/PaqueteriaAlm/EnviarPaq', customerController.SendPaq);
router.get('/Operis/CyberDisp', customerController.DispCyber);
router.get('/Operis/CyberDisp/GestionEquipos', customerController.EquiposCyber);

module.exports = router;