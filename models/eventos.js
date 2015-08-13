var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/*Modelo de Lista de Eventos y Torneos Creados*/

var eventSchema = new Schema({
	nombre: String,
	desc: String,
	imagen: String
});

var eS = mongoose.model('Torneos', eventSchema);

/*Modelo de los Eventos y Torneos Que estan o Fueron Activados*/

var eventosActivosSchema = new Schema({
	nombre: String,
	estado: {type: String, default: "Activo"},
	year: Number,
	desc: String,
	periodo: String,
	clave: String
});

var eAS = mongoose.model('Activos', eventosActivosSchema);


/*Función de Creación de Eventos y Torneos*/

var crearEvento = function(evento, callback){
	eS.save({
		nombre: evento.nombre,
		desc: evento.desc,
		imagen: evento.imagen
	}).exec(callback)

};

/*Función de Borrado y Eliminación de Eventos y Torneos*/

var borrarEvento = function(evento_id, callback){
	eS.findOne({nombre: evento_id}).remove().exec(callback);
}

/*Funcion de Busqueda de Eventos y Torneos Activos*/

var buscarEventos = function(callback){
	eAS.find({}).exec(callback);

}

/*Función de Creación de Nuevo Evento y Torneo Activo*/

var crearEventoActivo = function(evento, callback){
	var fecha = new Date();
	var y = fecha.getFullYear();
	eAS.save({
		nombre: evento.nombre,
		estado: "Activo",
		year: y,
		desc: evento.desc,
		periodo: "Inscripciones",
		clave: evento.clave
	}).exec(callback);
}

module.exports.cE = crearEvento;
module.exports.bE = borrarEvento;
module.exports.bscE = buscarEventos;
module.exports.cEA = crearEventoActivo;