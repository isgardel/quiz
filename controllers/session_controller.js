// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};


// Get /login   -- Formulario de login
exports.new = function(req, res) {
    var errors = req.session.errors || {}; //guarda en errors, los errores si los hay y
    req.session.errors = {};                //vacía la vble de errores de sesión

    res.render('sessions/new', {errors: errors});
};

// POST /login   -- Crear la sesion si usuario se autentica
exports.create = function(req, res) {

    var login     = req.body.login;
    var password  = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {

        if (error) {  // si hay error retornamos mensajes de error de sesión
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");        
            return;
        }

        // Crear req.session.user y guardar campos   id  y  username
        // La sesión se define por la existencia de:    req.session.user
        req.session.user = {id:user.id, username:user.username};
        //vble, que guarda el tiempo desde que inició sesión, y que se borrar al salir
        //al ser parte del obj, req.session
        req.session.tiempoCreacionSesion = (new Date()).getTime() ;

        //res.redirect(req.session.redir.toString());// redirección a path anterior a login
        res.redirect("/");
        
    });
};

// DELETE /logout   -- Destruir sesion 
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString()); // redirect a path anterior a login
}; 