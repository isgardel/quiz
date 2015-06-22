var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var authorController = require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas de /quizes

router.get('/quizes/', quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show); //muestra la pregunta
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer); //muestra la respuesta

//creación de preguntas nuevas
router.get('/quizes/new', quizController.new); //llama al formulario, que introduce la pregunta
router.post('/quizes/create', quizController.create);//y recibe el POST, con el que insertará en la BD, luego
//                                                    //redirecciona de nuevo a /quizes
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit); //editamos una pregunta ya creada
router.put('/quizes/:quizId(\\d+)',  quizController.update);
//Créditos
router.get('/author/creditos', authorController.creditos);


module.exports = router;
