var models = require('../models/models.js');


var estadisticas = {
    totalQuizes: 0,
    totalComentarios: 0,
    quizesConComentarios: 0,
    quizesSinComentarios: 0
}

var errors = [];

/*
exports.estadisticas = function(req, res, next) {
    
    models.Quiz.count()
    .then(function(contarQuizes) {
        // contarQuizes se devuelve como entero
        estadisticas.totalQuizes = contarQuizes;
         //console.log(contarQuizes);
         //console.log(estadisticas.totalQuizes);
         estadisticas.totalQuizes = 1;
            estadisticas.totalComentarios = 2;
            estadisticas.quizesConComentarios = 3;
            estadisticas.quizesSinComentarios = 4;
          return estadisticas;
          
        })
    
};
*/



exports.estadisticas = function(req, res, next) {
    models.Quiz.count()
    .then(function(contarQuizes) {
        // contarQuizes se devuelve como entero
        estadisticas.totalQuizes = contarQuizes;
         //console.log(contarQuizes);
         //console.log(estadisticas.totalQuizes);
          return models.Comment.count();
          
        })
        .then(function (numComments) { // número de comentarios
            estadisticas.totalComentarios = numComments;
           // console.log(estadisticas.totalComentarios);
            
            return models.Comment.contarQuizesConComentarios();
            
          })
            .then(function (numQuizesConComentarios) { // número de comentarios
            estadisticas.quizesConComentarios = numQuizesConComentarios;
           //console.log('En controlador '+estadisticas.quizesConComentarios);
            
            return models.Quiz.contarQuizesSinComentarios();
          })
                .then(function (numQuizesSinComentarios) { // número de comentarios
                estadisticas.quizesSinComentarios = numQuizesSinComentarios;
               console.log('En controlador '+estadisticas.quizesSinComentarios);
                
                //return models.Comment.quizesSinComentarios();
           
                })
                    .catch(function (err) { errors.push(err); })
                    .finally(function () {
                         next();
                     });
        
   
    
    
    
};


// GET /quizes/statistics
exports.show = function (req, res) {
 res.render('statistics/show', { estadisticas: estadisticas, errors: errors });
 //res.render('statistics/show', { estadisticas: estadisticas });
};