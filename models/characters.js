var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/*Modelo Principal de Personajes

	Apartado: Datos Generales*/

var datosGeneralesSchema = new Schema({
	charac_id: {type: Number, index: { unique: true }},
	usuario: {type: String, default: " "},
	nombre: {type: String, default: " "},
	armadura: {type: String, default: " "},
	clase: {type: String, default: " "},
	estilo: {type: String, default: " "},
	elementos: {type: String, default: " "},
	nivel: {type: Number, default: 1},
	na: {type: Number, default: 1},
	estado: {type: String, default: " "},
	activo: {type: Boolean, default: false},
	tipo: {type: String, default: " "}
})

var Ch = mongoose.model('Personaje', datosGeneralesSchema);

/* Modelo Principal de Personajes

	Apartado: Técnicas de Ataque*/

var ataquesPJ = new Schema({
	nombre: {type: String, default: " "},
	tipo: {type: String, default: " "},
	especial: {type: String, default: " "},
	daño: {type: Number, default: 0},
	gasto: {type: Number, default: 0},
	bonus: {type: Number, default: 0}
})

var At = mongoose.model('Ataques', ataquesPJ);

/* Modelo Principal de Personajes

	Apartado: Técnicas de Defensas*/

var defensasPJ = new Schema({
	nombre: {type: String, default: " "},
	tipo: {type: String, default: " "},
	especial: {type: String, default: " "},
	poder: {type: Number, default: 0},
	gasto: {type: Number, default: 0},
	bonus: {type: Number, default: 0}
})

var Df = mongoose.model('Defensas', defensasPJ);

/*Modelo Principal de Personajes

	Apartado: Sentidos*/

var sentidosPJ = new Schema({
	vista: {type: Number, default: 5},
	gusto: {type: Number, default: 5},
	tacto: {type: Number, default: 5},
	oido: {type: Number, default: 5},
	olfato: {type: Number, default: 5},
	intuicion: {type: Number, default: 0},
	septimo: {type: Number, default: 0},
	octavo: {type: Number, default: 0},
	omega: {type: Number, default: 0},
	decimo: {type: Number, default: 0}
});

var Sn = mongoose.model('Sentidos', sentidosPJ);

/* Modelo Principal de Personajes

	Apartado: Habilidades*/

var habilidadesPJ = new Schema({
	nombre: {type: String, default: " "},
	tipo: {type: String, default: " "},
	desc: {type: String, default: " "},
	clave: {type: String, default: " "}
});

var Hb = mongoose.model('Habilidades', habilidadesPJ);

/* Modelo Principal de Personajes

	Apartado: Atributos*/

var atributosPJ = new Schema({
	pv: {type: Number, default: 200},
	bonuspv: {type: Number, default: 0},
	cosmos: {type: Number, default: 0},
	bonusApc: {type: Number, default: 0},
	bonuspc: {type: Number, default: 0},
	cp: {type: Number, default: 0},
	pva: {type: Number, default: 0},
	bonuspva: {type: Number, default: 0}
})

var Atr = mongoose.model('Atributos', atributosPJ);

/* Modelo Principal de Personajes

	Apartado: BASES*/

var basesPJ = new Schema({
	caballero: {type: Number, default: 0},
	af: {type: Number, default: 0},
	baf: {type: Number, default: 0},
	df: {type: Number, default: 0},
	bdf: {type: Number, default: 0},
	ac: {type: Number, default: 0},
	bac: {type: Number, default: 0},
	dc: {type: Number, default: 0},
	bdc: {type: Number, default: 0},
	ap: {type: Number, default: 0},
	bap: {type: Number, default: 0},
	dp: {type: Number, default: 0},
	bdp: {type: Number, default: 0},
	ba: {type: Number, default: 0}
})

var Ba = mongoose.model('Bases', basesPJ);

/*Buscar todos los Personajes Disponibles en la Base de datos*/
var buscarPJ = function(callback){
	Ch.find({}).exec(callback);
};

/*Buscar todos los personajes relacionados con el usuario*/

var buscarPjUsuario = function(user_id, callback){
	Ch.find({usuario: user_id}).sort({nombre: 1, nivel: 1}).exec(callback);
}


module.exports.verPJ = buscarPJ;
module.exports.pjUser = buscarPjUsuario;