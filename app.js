var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override'); //para que al editar pregunta, convertir el POST en PUT, el enviar
                                        // en edit.ejs el form con action="/quizes/<%= quiz.id %>?_method=put"
var session = require('express-session');


var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded()); 
app.use(cookieParser('Quiz 2015')); //añadir semilla, para cifrar la cookie
app.use(session());

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Middleware, para controlar el tiempo de sesión máximo sin interactuar
app.use(function(req, res, next){
    var tiempoMaximoInactividad = 120000; //milisegundos para eliminar la sesión
    if (req.session.user) { //Si existe la sesión, comprobamos el tiempo de inactividad, con la vble creada en
                            //session_controller.js, tiempoCreacionSesion       
        if (req.session.tiempoCreacionSesion + tiempoMaximoInactividad  > (new Date()).getTime()) { // Si no ha expirado Actualizamos la hora de expiracion
            req.session.tiempoCreacionSesion = (new Date()).getTime();
            next();
        } else {
            req.session.destroy(); // Si la sesion ha expirado la cerramos
            res.redirect("/login");
            next();
        }
    } else {
        next(); // Si no había sesión iniciada no hacemos nada, y pasamos al siguiente
    }
});

// Helpers dinamicos:
app.use(function(req, res, next) {

  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});



app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
             errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
         error: {},
        errors: []

    });
});


module.exports = app;
