/*Se inician los mods que dan cuerpo al modelo*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/*Modelo Básico de Noticia*/

var noticia_schema = new Schema({
	id: {type: Number, index: { unique: true }},
	url: String,
	titulo: String,
	desc1: String,
	desc2: String,
	temas: {
		actu: String,
		reglas: String,
		sanciones: String,
		eventos: String,
		torneos: String,
		aventuras: String,
		invasiones: String,
	} ,
	calificacion: {
		carrusel: String,
		destacado: String
	},
	fecha: String,
	autor: String,
	imagen: String
})

/*Aceptación del Modelo de Noticias*/

var Noticia = mongoose.model("Noticias", noticia_schema);



/*Función que crea una noticia*/

var crear_noticia = function(noticia, callback){
	var fecha = Date.now();
	var f1 = new Date(fecha);
	var dia = f1.getDate();
	var mes = f1.getMonth()+1;
	var ano = f1.getFullYear();
	var comp = dia+"/"+mes+"/"+ano;
	var not = new Noticia();
	not['id'] = noticia['id'];
	not.url = noticia.url
	not.titulo = noticia.titulo;
	not.desc1= noticia.desc1;
	not.desc2 = noticia.desc2;
	not.temas = new Object();
	not.temas.actu = noticia.temas.actu;
	not.temas.reglas = noticia.temas.reglas;
	not.temas.sanciones = noticia.temas.sanciones;
	not.temas.eventos = noticia.temas.eventos;
	not.temas.torneos = noticia.temas.torneos;
	not.temas.aventuras = noticia.temas.aventuras;
	not.temas.invasiones = noticia.temas.invasiones;
	not.calificacion = new Object();
	not.calificacion.carrusel = noticia.calificacion.carrrusel;
	not.calificacion.destacado = noticia.calificacion.destacado;
	not.fecha = comp;
	not.autor = noticia.autor;
	not.imagen = noticia.imagen;
	not.save({}, callback);

}

/*Funcion que busca todas las noticias*/

var bus_not = function(callback){
	Noticia.find({}).sort({$natural:-1}).exec(callback);

}

/*Funcion que sólo busca 5 ´noticias*/

var bus5 = function(callback){
	Noticia.find({}).sort({$natural:-1}).limit(5).exec(callback);
}

/*Función que busca una noticia concreta por ID*/

var buscar = function(not_id, callback){
	Noticia.find({id: not_id}).exec(callback);
}

/*Funcion que busca noticia concreta porID y la borra*/

var borrar = function(not_id, callback){
	Noticia.find({id: not_id}).remove().exec(callback);
}

/*Funcion que busca noticia concreta por Url*/

var buscar2 = function(not_url, callback){
	Noticia.find({url: not_url}).exec(callback);
}

module.exports.crearNot = crear_noticia;
module.exports.buscarNot = bus_not;
module.exports.bus5 = bus5;
module.exports.buscarNoticia = buscar;
module.exports.borrarNoticia = borrar;
module.exports.buscar2 = buscar2;