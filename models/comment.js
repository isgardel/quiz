// Definicion del modelo de Quiz con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Comment',
    { texto: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Comentario"}}
      },
      publicado: {
      	type: DataTypes.BOOLEAN,
      	defaultValue: false
      }
    },
    {
      classMethods: {
	  contarQuizesConComentarios: function() {
	      return this.aggregate('QuizId', 'count', { distinct: true });
	      //console.log('ClassMetods '+contar);
	      //return this.contar;
	  }
      }
    }
  );
}

//Select * from t1 where not exists (select 1 from t2 where t2.id = t1.id)