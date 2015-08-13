var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//
//
//
//
//

var rooms = new Schema({
	room_id: {type: Number, index: { unique: true }},
	battle_id: Number
});

var Rm = mongoose.model('Rooms', rooms);

// datosInicio = a los datos del personaje/jugador al comienzo
// 		Nivel/Na/Pv/Cosmos/PvA/Cp/ArmEstado/PjEstado/Habilidades/inicio
//
//
//


/*
Datos de cada batalla
id_batalla
titulo:
estado
escenario principal
escenario secundario
*/

var modeloBatalla = new Schema({
	id_batalla: {type: Number, index: { unique: true }},
	clave: String,
	titulo: {type: Number, default: ""},
	estado: {type: String, default: "Activo"},
	esc1: {type: Number, default: "0"},
	esc2: {type: Number, default: ""},
	pass: {type: String}
});

var batalla = mongoose.model('Batallas', modeloBatalla);

/*Datos de Participantes*/

var playerBatalla = new Schema({
	id_batalla: {type: Number},
	id_personaje: {type: Number},
	nivel: {type: Number, default: 1},
	na: {type: Number, default: 1},
	hab: {type: String},
	bando: {type: Number}
});



/*
Datos de Turno
id de batalla
participantes:
	- pv maximo
	- pv actuales
	- cosmos maximos
	- cosmos actuales
	- cosmos bonus armadura
	- pva
	- cp
	- af
	- df
	- ac
	- dc
	- ap
	- dp
	- ba
*/

var buscarBatallas = function(callback){
	batalla.find({estado: "Activo"}).sort({$natural: 1}).exec(callback);
}

module.exports.bscBat = buscarBatallas;
