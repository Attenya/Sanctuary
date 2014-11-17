// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/usuarios'
  , db              = mongoose.createConnection(db_lnk)
  , helpers			= require('../helpers/users')
  , async 			= require('async')
  , user 			= ""
  ,Passport = require('passport')
  ,LocalStrategy = require('passport-local').Strategy;


// Creación de variables para cargar el modelo
var usuario_schema = require('../models/users')
  , Usuario = db.model('Usuario', usuario_schema);

  /*Funcion que encuentra todos los usuarios*/
exports.find = function (req, res, next){
Usuario.find({}, findUsers);
function findUsers(err, usuarios){
	if(err){
		console.log(err);
		return next();
	};
	return res.render('users', {title: 'Lista de Usuarios', usuarios: usuarios});
};
};

/*Funcion que encuentra un usuario concreto y lo muestra*/
exports.show_edit = function(req, res, next){
//Se obtiene el parametro id desde la url
var id =  req.params.user_id;
function findUserI(err, usuario){
	if(err){
		console.log(err);
		return next();
	};
	return res.render('perfil', {title: 'El Santuario: Perfil - ' + id, usuario: usuario});
};
function findUserII(err, usuario){
	if(err){
		console.log(err);
		return next;
	}
	return res.render('perfil_edit', {title: 'El Santuario: Perfil - ' + id, usuario: usuario});
}
if(user.user_id== id){
Usuario.findOne({user_id: id}, findUserI);

} else {
	Usuario.findOne({user_id: id}, findUserII);
};

};

/*Funcion que extrae los datos modificados de un usuario y actualiza así la base de datos.*/
exports.update = function(req, res, next){
	//Se extrae el parametro ID de la URL
var id = req.params.user_id;
//Se extrae los datos del formulario POST
var user_id = req.body.id;
var mail = req.body.mail;
var pass = req.body.password;
//Se validan los datos para que no contengan errores
//
// Colocar aqui código
//
//Se realiza el proceso de sustitución y de guardado
Usuario.findOne({id: id}, setUser);
//Funcion que controla el comportamiento de la actualización
function setUser(err, usuario){
if(err){
	console.log(err);
	return next(err);
};

if(!usuario){
	console.log('ERROR: Usuario no existe');
	return res.send('Usuario Inválido');
} else {
	usuario.id = user_id;
	usuario.mail = mail;
	usuario.pass = pass;
	usuario.save(saveUser);
	};
};
//Funcion que inicia el guardado de los datos
function saveUser(err){
if(err){
	console.log(err);
	return next(err);
};
return res.redirect('/user/' + user_id);
	};
};




exports.remove = function(req, res, next){
	res.send('remove');
}




exports.create = function(req, res, next){
	switch(req.method){
		case 'GET':
		if(user){
		res.redirect('/');
		}
		res.render('registro', {title: 'El Santuario: Registrate'});
		break;
		case 'POST':
		/*Se extraen las variables  del formulario*/
		var user_id = req.body.user_id;
		var pass = req.body.pass;
		var mail = req.body.mail;
		var pin = req.body.pin;
		res.redirect('/');
}

}


exports.login = function(req, res, next){



var back= '/';
switch(req.method){
	case 'GET':
	if(user){
	res.redirect('/');
	} else {
	res.render('conectar', {title: 'El Santuario: Conectate', form: req.body});
	}
	break;
	case 'POST':
	if(req.param('back')){
		back = req.param('back');
	}
	Usuario.findOne({user_id: req.body.user_id, password: req.body.user_pass}, function(err,users){
		if(!err){
			if(users){
					user = users;
					res.locals.user = users;
					res.redirect(back);

			}
		} else {
			res.render('conectar', {title: 'El Santuario: Conectate', form: req.body});
		}
	})
}

}

exports.unLogin = function(req,res,next){
	 req.session.destroy(function(err){
        if( !err ){
            res.redirect('/conectar');

        }
    });
}