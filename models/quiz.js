//Definición del modelo de Quiz y la validación

module.exports = function(sequelize, DataTypes) {
     return sequelize.define(
  	'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      },
      tema: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Tema"}}
      }
    },
      {  
      classMethods: {
	  
	  contarQuizesSinComentarios: function() {
	   // return this.aggregate('id', 'count', { distinct: true, where: 'not exists (select QuizId from Comments where Comments.QuizId = Quiz.id)'});
	    return 1; 
	      
	  }
      }
    }
  );
}

//Select * from t1 where not exists (select 1 from t2 where t2.id = t1.id)