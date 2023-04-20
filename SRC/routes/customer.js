const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.inicio);
router.get('/direct', customerController.operisDirect);
router.get('/Empleados', customerController.empleados);
router.post('/Empleados/Menu', customerController.isAdmin);
router.get('/Empleados/Menu', customerController.isAdmin);
router.post('/Empleados/Menu/Create', customerController.CreateUser);
router.post('/Empleados/Menu/EditUserSection', customerController.EditUserSection);
router.post('/Empleados/Menu/EditUser', customerController.EditUser);
router.post('/Empleados/Menu/DeleteUser', customerController.DeleteUser);
router.get('/PaqueteriaAlm', customerController.paqueteriaAlmac);

module.exports = router;