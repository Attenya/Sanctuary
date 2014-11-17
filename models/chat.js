var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mensaje = new Object();

// Modelo de los mensajes realizados en cualqueir
// tipo de chat que no sea privado.
//
//

var chat_schema = new Schema({
	emisor: String,
	sala: String,
	mensaje: String,
	hora: Date,
	fecha: Date
});

var gM = mongoose.model('Chat General', chat_schema);
// Modelo de mensjes realizados para todos
// los mensajes privados.
//
//

var privado_schema = new Schema({
	emisor: String,
	receptor: String,
	mensaje: String,
	hora: Date,
	fecha: Date
});

var pM = mongoose.model('Chat Privado', privado_schema);
//funcion que controla la fecha y la hora 
// en la que se realiza el mensaje
// Ya sea via privado o via chat general 
// o chat room


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

// Funcion que muestra los mensajes de la sala 
// en la que el usuario se encuentra en ese
// preciso momento
//
var mensaje_room = function(usuario, msj, sala, callback){
	var f = new this.fecha();
	var hora = f.hora();
	var fecha = f.actual();
	mensaje.emisor = usuario;
	mensaje.mensaje = msj;
	mensaje.sala = sala;
	mensaje.hora = hora;
	mensaje.fecha = fecha;
	gM.save({
		emisor: mensaje.emisor,
		sala: mensaje.sala,
		mensaje: mensaje.msj,
		hora: mensaje.hora,
		fecha: mensaje.fecha

	}, function(err, res){
		callback
	});
};

//
//
//
//

var mensaje_privado = function(emisor, receptor, msj, callback){
	var f = new this.fecha(),
	var hora = f.hora();
	var fecha = f.actual();
	mensaje.emisor = emisor;
	mensaje.receptor = receptor;
	mensaje.msj = msj;
	mensaje.hora = hora;
	mensaje.fecha = fecha;
	pM.save({
		emisor: mensaje.emisor,
		receptor: mensaje.receptor,
		mensaje: mensaje.msj,
		hora: mensaje.hora,
		fecha: mensaje.fecha
	}, function(err,res){
		callback
	});

};


var usuarios_conectados = function (){

}






module.exports = 