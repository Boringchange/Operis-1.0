const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.inicio);
router.get('/Login', customerController.empleados);
router.get('/direct', customerController.operisDirect);
router.post('/direct', customerController.operisDirect);
router.post('/Empleados', customerController.isAdmin);
router.get('/Empleados', customerController.isAdmin);
router.post('/Empleados/Create', customerController.CreateUser);
router.post('/Empleados/EditUserSection', customerController.EditUserSection);
router.post('/Empleados/EditUser', customerController.EditUser);
router.post('/Empleados/DeleteUser', customerController.DeleteUser);
router.get('/PaqueteriaAlm', customerController.paqueteriaAlmac);
router.get('/PaqueteriaAlm/AddSection', customerController.AddPaqSection);
router.post('/PaqueteriaAlm/AddPaq', customerController.AddPaq);
router.post('/PaqueteriaAlm/DeletePaq', customerController.DeletePaq);
router.post('/PaqueteriaAlm/EditPaqSection', customerController.EditPaqSection);
router.post('/PaqueteriaAlm/EditPaq', customerController.EditPaq);
router.get('/PaqueteriaAlm/EnviarPaq', customerController.SendPaq);
router.get('/CyberDisp', customerController.DispCyber);

module.exports = router;