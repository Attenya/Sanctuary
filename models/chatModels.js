var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarios = require('../models/users');

// Modelo de los mensajes realizados en cualqueir
// tipo de chat que no sea privado.
//
//



var chat_schema = new Schema({
	tipo: String,
	emisor: String,
	mensaje: String,
	bando: String,
	fecha: {type: Date, default: Date.now}
});

var gM = mongoose.model('Chat General', chat_schema);

// Modelo de mensjes realizados para todos
// los mensajes privados.
//
//

var privado_schema = new Schema({
	tipo: String,
	emisor: String,
	receptor: String,
	mensaje: String,
	fecha: {type: Date, default: Date.now()}
});

var pM = mongoose.model('Chat Privado', privado_schema);



var fecha = function () {
	this.fecha  = new Date(),
	this.hora = function () {
		var hora = this.fecha.getHours()+":"+ this.fecha.getMinutes()+':'+this.fecha.getSeconds();
		return hora;
	}

	this.actual = function () {
		var actual = this.fecha.getDate()+"/"+(this.fecha.getMonth()+1)+"/"+this.fecha.getFullYear();
		return actual;
	}
};	

// Funcion que guarda los mensajes de la sala 
// en la que el usuario se encuentra en ese
// preciso momento
//
var mensajeRoom = function(usuario, bando, msj, callback){
	var msg = new gM();
	msg.tipo = "general";
	msg.emisor = usuario;
	msg.mensaje = msj;
	msg.fecha = Date.now();
	msg.bando = bando;
	msg.save({}, callback);
};

// Funcion que guarda los mensajes privados de todos
// los usuarios que se encuentren conectados
//
//

var mensajePrivado = function(emisor, receptor, msj, callback){
	var f = new this.fecha();
	var hora = f.hora();
	var fecha = f.actual();
	pM.insert({
		tipo: "privado",
		emisor: emisor,
		receptor: receptor,
		mensaje: msj,
		hora: hora,
		fecha: fecha
	}, function(err,res){
		callback
	});

};

// Funcion que actualiza el estado del usuario 
// a conectado, y en que sala se encuentra.
//
//

var conectado = function (usuario, callback){
	usuarios.findOne({user_id: usuario}, function(err, user){
		if(err){
			return next();
			console.log(err);
 		};
 		if(user){
 			user.chat = "conectado";
 			user.save(callback);
 		};
	});
};

// Funcion que actualiza el estado del usuario
// ha desconectado y lo desconecta de la sala 
// en la que se encontraba anteriormente.
//

var desconectado = function(usuario, callback){
	usuarios.findOne({user_id: usuario}, function(err, user){
		if(err){
			return next();
			console.log(err);
		};
		if(user){
			user.chat = "desconectado";
			user.save(callback);
		};
	});
};

// Funcion que actualiza la sala en la que el 
// usuario se encuentra conectado en ese preciso
// momento.
//

var cambiarRoom = function(usuario, sala, callback){
	usuarios.findOne({user_id: usuario}, function(err,user){
		if(err){
			return next();
			console.log(err);
		};
		if(user){
			user.sala = sala;
			user.save(callback);
		};
	});
};

// Funcion que extrae de la base de datos
// los 20 ultimos mensajes dentro de 
// la fecha indicada
//

var extraerGM = function( callback){
gM.find({tipo: "general"}).sort({$natural:-1}).limit(10).exec(callback);
}

// Funcion que extrae de la base de datos
// los usuarios que se encuentran conectados
// en la actual sala en la que se encuentre
//

var usuariosConectados = function(callback){
	usuarios.find({chat: "conectado"}).sort([['user_id', 'descending']]).exec(callback);
};

// Funcion que extrae de la base de datos
// el usuario conectado y comprueba a que 
// room se encuentra conectado.
//

var usuarioRoom = function(user_id, callback){
	usuarios.findOne({user_id: user_id}).exec(callback);
}



module.exports.general = mensajeRoom;
module.exports.privado = mensajePrivado;
module.exports.conectar = conectado;
module.exports.desconectar = desconectado;
module.exports.salaNueva = cambiarRoom;
module.exports.recargar = extraerGM;
module.exports.conectados = usuariosConectados;
module.exports.fecha  = fecha; 
module.exports.userRoom = usuarioRoom;