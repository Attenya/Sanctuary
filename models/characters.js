var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var character_schema = new Schema({
	charac_id: {type: Number, index: { unique: true }},
	nombre: String,
	clase: String,
	estilo: String,
	nivel: Number,
	na: Number,
	estado: String,
	activo: Boolean,
	ataques: {
		1: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			gasto: Number,
			bonus: Number
		},
		2: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			gasto: Number,
			bonus: Number
		},
		3: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			gasto: Number,
			bonus: Number
		},
		4: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			gasto: Number,
			bonus: Number
		},
		5: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			gasto: Number,
			bonus: Number
		},
		6: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			gasto: Number,
			bonus: Number
		},
		7: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			gasto: Number,
			bonus: Number
		},
		8: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			gasto: Number,
			bonus: Number
		},
		9: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			gasto: Number,
			bonus: Number
		},
		10: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			gasto: Number,
			bonus: Number
		}

	},
	defensas: {
		1: {
			nombre: String,
			tipo: String,
			especial: String,
			antidaño: Number,
			gasto: Number,
			bonus: Number
		},
		2: {
			nombre: String,
			tipo: String,
			especial: String,
			antidaño: Number,
			gasto: Number,
			bonus: Number
		},
		3: {
			nombre: String,
			tipo: String,
			especial: String,
			antidaño: Number,
			gasto: Number,
			bonus: Number
		},
		4: {
			nombre: String,
			tipo: String,
			especial: String,
			antidaño: Number,
			gasto: Number,
			bonus: Number
		},
		5: {
			nombre: String,
			tipo: String,
			especial: String,
			antidaño: Number,
			gasto: Number,
			bonus: Number
		},
		6: {
			nombre: String,
			tipo: String,
			especial: String,
			antidaño: Number,
			gasto: Number,
			bonus: Number
		},
		7: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: Number,
			antigasto: Number,
			bonus: Number
		},
		8: {
			nombre: String,
			tipo: String,
			especial: String,
			antidaño: Number,
			gasto: Number,
			bonus: Number
		},
		9: {
			nombre: String,
			tipo: String,
			especial: String,
			antidaño: Number,
			gasto: Number,
			bonus: Number
		},
		10: {
			nombre: String,
			tipo: String,
			especial: String,
			antidaño: Number,
			gasto: Number,
			bonus: Number
		}

	},
	sentidos: {
		vista: Number,
		gusto: Number,
		tacto: Number,
		oido: Number,
		olfato: Number,
		intuicion: Number,
		septimo: Number,
		octavo: Number,
		omega: Number,
		decimo: Number
	},
	habilidades: {
		1: {
			nombre: String,
			tipo: String,
			descripcion: String,
			clave: String
		},
		2: {
			nombre: String,
			tipo: String,
			descripcion: String,
			clave: String
		},
		3: {
			nombre: String,
			tipo: String,
			descripcion: String,
			clave: String
		},
		4: {
			nombre: String,
			tipo: String,
			descripcion: String,
			clave: String
		},
		5: {
			nombre: String,
			tipo: String,
			descripcion: String,
			clave: String
		},
		6: {
			nombre: String,
			tipo: String,
			descripcion: String,
			clave: String
		},
		7: {
			nombre: String,
			tipo: String,
			descripcion: String,
			clave: String
		},
		8: {
			nombre: String,
			tipo: String,
			descripcion: String,
			clave: String
		}
	},
	atributos: {
		pv: Number,
		bonuspv: Number,
		cosmos: Number,
		bonusApc: Number,
		bonuspc: Number,
		cp: Number,
		pva: Number,
		bonuspva: Number
	},
	bases: {
		caballero: Number,
		af: Number,
		baf: Number,
		df: Number,
		bdf: Number,
		ac: Number,
		bac: Number,
		dc: Number,
		bdc: Number,
		ap: Number,
		bap: Number,
		dp: Number,
		bdp: Number,
		ba: Number
	}
});

var Ch = mongoose.model('Personaje', character_schema);


// Funcion que inserta los datos del personaje
// dentro de la base de datos, NO ACTUALIZA
//
//
//

var crearPJ = function(objeto, finalidad, callback){
	var pj = new Ch();
	console.log(objeto);
	pj.charac_id = objeto.charac_id;
	pj.nombre = objeto.nombre;
	pj.clase = objeto.clase;
	pj.nivel = objeto.nivel;
	pj.na = objeto.na;
	pj.estilo = objeto.estilo;

	//<<<<<<<ATRIBUTOS>>>>>>
	pj.atributos.pv = objeto.atributos.pv;
	pj.atributos.bonuspv = objeto.atributos.bonuspv || 0;
	pj.atributos.cosmos = objeto.atributos.cosmos || 0;
	pj.atributos.bonusApc = objeto.atributos.bonusApc;
	pj.atributos.bonuspc = objeto.atributos.bonuspc || 0;
	pj.atributos.cp = objeto.atributos.cp || 0;
	pj.atributos.pva = objeto.atributos.pva || 0;
	pj.atributos.bonuspva = objeto.atributos.bonuspva || 0;


	// <<<<<<ATAQUES>>>>>>>
	for(var i =1; i<11; i++){
		pj.ataques[i].nombre = objeto.ataque[i].nombre;
		pj.ataques[i].tipo = objeto.ataque[i].tipo;
		pj.ataques[i].especial = objeto.ataque[i].especial;
		pj.ataques[i].daño = objeto.ataque[i].daño;
		pj.ataques[i].bonus = objeto.ataque[i].bonus;
		pj.ataques[i].gasto = objeto.ataque[i].gasto;
	}

	//<<<<<<DEFENSAS>>>>>>>
	for(vari=1; i<11; i++){
		pj.defensas[i].nombre = objeto.defensa[i].nombre;
		pj.defensas[i].tipo = objeto.defensa[i].tipo;
		pj.defensas[i].especial = objeto.defensa[i].especial;
		pj.defensas[i].antidaño = objeto.defensa[i].antidaño;
		pj.defensas[i].bonus = objeto.defensa[i].bonus;
		pj.defensas[i].gasto = objeto.defensa[i].gasto;
	}

	// <<<<<<<HABILIDADES>>>>>>
	for(var i =1; i<8; i++){
		pj.habilidades[i].nombre = objeto.habilidades[i].nombre; 
		pj.habilidades[i].tipo = objeto.habilidades[i].tipo; 
		pj.habilidades[i].descripcion = objeto.habilidades[i].descripcion; 
		pj.habilidades[i].clave = objeto.habilidades[i].clave; 
	}

	// <<<<<<<SENTIDOS>>>>>>>
	pj.sentidos.vista = objeto.sentidos.vista || 0;
	pj.sentidos.gusto = objeto.sentidos.gusto || 0;
	pj.sentidos.tacto = objeto.sentidos.tacto || 0;
	pj.sentidos.olfato = objeto.sentidos.olfato || 0;
	pj.sentidos.oido = objeto.sentidos.oido || 0;
	pj.sentidos.intuicion = objeto.sentidos.intuicion || 0;
	pj.sentidos.septimo = objeto.sentidos.septimo || 0;
	pj.sentidos.octavo = objeto.sentidos.octavo || 0;
	pj.sentidos.omega = objeto.sentidos.omega || 0;
	pj.sentidos.decimo = objeto.sentidos.decimo || 0;

	// <<<<<<<BASES>>>>>>
	pj.bases.caballero = objeto.bases.caballero;
	pj.bases.af = objeto.bases.af;
	pj.bases.df = objeto.bases.df;
	pj.bases.ac = objeto.bases.ac;
	pj.bases.dc = objeto.bases.dc;
	pj.bases.ap = objeto.bases.ap;
	pj.bases.dp = objeto.bases.dp;
	pj.bases.baf = objeto.bases.baf;
	pj.bases.bdf = objeto.bases.bdf;
	pj.bases.bac = objeto.bases.bac;
	pj.bases.bdc = objeto.bases.bdc;
	pj.bases.bap = objeto.bases.bap;
	pj.bases.bdp = objeto.bases.bdp;
	pj.bases.ba = objeto.bases.ba;
	if(finalidad == "nuevo"){
			pj.save({}, callback)
	};

	if(finalidad == "actualizar"){
		Ch.findOne({charac_id: pj.charac_id}, callback);
	};


}

//
//
//
//
//



// Funcion que extrae los datos de todos
// los personajes disponibles hasta este
// momento dentro de la base de datos
//
//

var verPJ = function(callback){
	Ch.find({}, null, {sort: {'charac_id': 'ascending'}}, callback);
};

// Funcion que extrae los datos de un personaje
// concreto que se encuentre disponible dentro
// de la base de datos.
//
//

var buscarPj = function(personaje, callback){
	Ch.findOne({charac_id: personaje}).exec(callback);
};


// Funcion que encuentra una coincidencia
// y lo elimina
//
//
//

var eliminarPj = function(personaje, callback){
	Ch.remove({charac_id: personaje}).exec(callback);
};

var idPj = function(callback){
	Ch.find({}).sort({charac_id:1}).limit(1).exec(callback);
}

module.exports.crearPJ = crearPJ;
module.exports.verPJ = verPJ;
module.exports.buscarPJ = buscarPj;
module.exports.eliminarPJ = eliminarPj;
module.exports.idPJ = idPj;