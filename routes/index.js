var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {  //se ejecutará sólo para GET
  res.render('index', { title: 'Quiz' }); //renderizamos la vista a index, que es /views/index.ejs
});

module.exports = router;
