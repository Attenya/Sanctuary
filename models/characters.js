var mongoose = require('mongoose'),


Schema = mongoose.Schema;
var character_schema = new Schema({
	charac_id: {type: Number, index: { unique: true }},
	name: String,
	ataques: [],
	defensas: [],
	nivel: Number,
	nivel_armadura: Number,
	habilidades: [],
	sentidos: [],
	atributos: [],
	bases: [],
	datos_personales: [],
	estado: String,
	activo: Boolean
});


module.exports = mongoose.model('Personaje', character_schema);