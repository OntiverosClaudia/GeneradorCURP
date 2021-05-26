/*jshint esversion: 6 */

// Importar modulos 
const { resolveInclude } = require('ejs');
const express = require('express');
const path = require('path');
const llamado = require('./funcion');

// Creamos un objeto de Router Express
const router = express.Router();

// Exportar nuestro modulo ROUTES
module.exports = router;

// Generacion de valores
const Middleware = function (req, res, next) {
    var Homoclave = '';
    var Faño = req.body.fecha.substring(0, 4);
    console.log(Faño)
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var digitos = '0123456789';
    for ( var i = 0; i < 1; i++ ) {
        // Se generan 2 caracteres, el primero puede ser numero o letra y el segundo es numero
        if(i == 0)
        {
            if(Faño < 2000)
            {
                Homoclave += digitos.charAt(Math.round(Math.random()* digitos.length));
            }
            else{
                Homoclave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
        }
        Homoclave += digitos.charAt(Math.round(Math.random()* digitos.length));
    }
    req.Middleware = Homoclave;
    next();
}

router.get('/', (req, res) =>{
    res.render('pages/home');
});

// Metodo post
router.post('/', Middleware, (req, res) =>{
    var CURP = llamado.Calcular(req.body) + req.Middleware;
    var Conversion = llamado.ConvertirE(req.body.estado);
    console.log(req.Middleware)
    console.log(CURP);
    res.render('pages/CURP', {datos: req.body, MostrarCURP: CURP, MandarC: Conversion});
});

router.get('/about', (req, res) =>{
    const users = [
    {name: "Holy", email: "holy.gmail.com", avatar: "http://placekitten.com/300/300"},
    {name: "Chris", email: "chris.gmail.com", avatar: "http://placekitten.com/400/400"},
    {name: "Aldo", email: "aldo.gmail.com", avatar: "http://placekitten.com/500/500"},
    {name: "Sam", email: "sam.gmail.com", avatar: "http://placekitten.com/700/700"},
    ];
    res.render('pages/about', {usuarios:users});
});

router.get('/contact', (req, res) =>{
    res.render('pages/contact');
});

router.post('/contact', (req, res)=>{
    console.log(req.body.nombre);
    console.log(req.body.correo);
    console.log(req.body.mensaje);
    //res.render('pages/contact');
});