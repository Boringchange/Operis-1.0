const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

//Importing routes
const customerRout = require('./routes/customer');
const {static, urlencoded} = require("express");

const PUERTO = 3000;

// settings
app.set('view engine', 'ejs'); //motor de plantillas
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(morgan('dev')); //Muestra las peticiones
app.use(myconnection(mysql, {
   host: 'localhost',
   user: 'root',
   password: 'n0m3l0',
   port: 3306,
   database: 'NEGOCIO3'
}, 'single'));
app.use(cookieParser('culosnegros123456789'));
app.use(express.urlencoded({extended: true}));
app.use(session({
   secret: 'culosnegros123456789',
   resave: true,
   saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true}));

//Routers

app.use('/', customerRout);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PUERTO, () => {
   console.log(`El server ha sido abierto en el puerto: ${PUERTO}`);
});