var express = require('express');
var router = express.Router();

var quizController = require('../controlles/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {  //se ejecutará sólo para GET
  res.render('index', { title: 'Quiz' }); //renderizamos la vista a index, que es /views/index.ejs
});

router.get('quizes/question', quizController.question);
router.get('quizes/answer', quizController.answer);

module.exports = router;
