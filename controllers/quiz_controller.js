var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId, es decir si la ruta tiene un id de quiz, lo carga
//automáticamente, y lo devuelve en req.quiz
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};


// GET /quizes

exports.index = function(req, res) {
    var search1 = '%'+req.query["search"]+'%';
   
    
    var search2 = '%'+req.query["tema"]+'%';
    console.log(search1);
    console.log(search2);
    
    if ((search1 == '%undefined%')&&(search2 == '%undefined%' )){  //si no han buscado nada, mostramos todas las quizes
        console.log('primera opción');
         models.Quiz.findAll().then(
                    function(quizes) {
                      res.render('quizes/index', { quizes: quizes, errors: []});
                    }
                  ).catch(function(error) { next(error);})
    }else if ((search1 != '%')&&(search2 == '%otro%' )){//si han escrito, buscamos por las palabras
        console.log('segunda opción');
         search1 = search1.split(' ').join('%');
        models.Quiz.findAll({where: ["pregunta like ?", search1], order: 'pregunta ASC'}).then(
          function(quizes) {
            res.render('quizes/index', { quizes: quizes, errors: []});
          }
        ).catch(function(error) { next(error);})
    }else {//si han seleccionado un tema
        console.log('tercera opción');
        models.Quiz.findAll({where: ["tema like ?", search2], order: 'pregunta ASC'}).then(
          function(quizes) {
            res.render('quizes/index', { quizes: quizes, errors: []});
          }
        ).catch(function(error) { next(error);}) 
    }
};

// GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', { quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render(
    'quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: []}
  );
};

//GET /quizes/new
exports.new = function(req, res) {
    var quiz = models.Quiz.build( //creamos el objeto quizes, para la nueva pregunta
        {pregunta: "Pregunta", respuesta: "Respuesta", tema: "tema"}
    );
    res.render('quizes/new', {quiz:quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
  
  quiz.validate().then(
        function(err){
            if (err) {
                    res.render('quizes/new', {quiz: quiz, errors: err.errors});
                  } else {
                    quiz // save: guarda en DB campos pregunta y respuesta de quiz
                    .save({fields: ["pregunta", "respuesta", "tema"]})
                    .then( function(){ res.redirect('/quizes')}) 
                  }      // res.redirect: Redirección HTTP a lista de preguntas  
        }
  )
};

//GET quizes/:id/edit
exports.edit = function(req, res){
    var quiz = req.quiz; //recibe el objeto de quiz que autoload ha cargado, para poder reutilizarlo
    //res.render(quiz, errors: []);
    
    console.log("edit");
    res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  
    console.log("update");
  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz     // save: guarda campos pregunta y respuesta en DB
        .save( {fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes');});
      }     // Redirección HTTP a lista de preguntas (URL relativo)
    }
  );
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};





