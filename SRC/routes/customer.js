const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.inicio);
router.get('/direct/', customerController.operisDirect);
router.get('/Empleados', customerController.empleados);
router.post('/Empleados/Menu', customerController.isAdmin);
router.post('/Empleados/Menu/EditUserSection', customerController.EditUser);


module.exports = router;