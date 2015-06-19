// GET /author/creditos
exports.creditos = function(req, res) {
   res.render('author/creditos', {autor: 'Isaac García'});
};