var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var character_schema = new Schema({
	charac_id: {type: Number, index: { unique: true }},
	nombre: String,
	clase: String,
	estilo: String,
	nivel: {type: Number, default: 1},
	na: {type: Number, default: 1},
	estado: String,
	activo: Boolean,
	ataques: {
		1: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		2: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		3: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		4: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		5: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		6: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		7: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		8: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		9: {
			nombre: String,
			tipo: String,
			especial: String,
			daño: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		10:{
			nombre: String,
			tipo: String,
			especial: String,
			daño: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		}

	},
	defensas: {
		1: {
			nombre: String,
			tipo: String,
			especial: String,
			poder: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		2: {
			nombre: String,
			tipo: String,
			especial: String,
			poder: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		3: {
			nombre: String,
			tipo: String,
			especial: String,
			poder: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		4: {
			nombre: String,
			tipo: String,
			especial: String,
			poder: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		5: {
			nombre: String,
			tipo: String,
			especial: String,
			poder: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		6: {
			nombre: String,
			tipo: String,
			especial: String,
			poder: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		7: {
			nombre: String,
			tipo: String,
			especial: String,
			poder: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		8: {
			nombre: String,
			tipo: String,
			especial: String,
			poder: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		9: {
			nombre: String,
			tipo: String,
			especial: String,
			poder: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		},
		10: {
			nombre: String,
			tipo: String,
			especial: String,
			poder: {type: Number, default: 0},
			gasto: {type: Number, default: 0},
			bonus: {type: Number, default: 0}
		}

	},
	sentidos: {
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
	},
	habilidades: {
		1: {
			nombre: String,
			tipo: String,
			desc: String,
			clave: String
		},
		2: {
			nombre: String,
			tipo: String,
			desc: String,
			clave: String
		},
		3: {
			nombre: String,
			tipo: String,
			desc: String,
			clave: String
		},
		4: {
			nombre: String,
			tipo: String,
			desc: String,
			clave: String
		},
		5: {
			nombre: String,
			tipo: String,
			desc: String,
			clave: String
		},
		6: {
			nombre: String,
			tipo: String,
			desc: String,
			clave: String
		},
		7: {
			nombre: String,
			tipo: String,
			desc: String,
			clave: String
		},
		8: {
			nombre: String,
			tipo: String,
			desc: String,
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
	var x = 1;
	for(var i=1; i<11; i++){
		pj.defensas[i].nombre = objeto.defensa[i].nombre;
		pj.defensas[i].tipo = objeto.defensa[i].tipo;
		pj.defensas[i].especial = objeto.defensa[i].especial;
		pj.defensas[i].poder = objeto.defensa[i].poder;
		pj.defensas[i].bonus = objeto.defensa[i].bonus;
		pj.defensas[i].gasto = objeto.defensa[i].gasto;
	}

	// <<<<<<<HABILIDADES>>>>>>
	for(var i =1; i<9; i++){
		pj.habilidades[i].nombre = objeto.habilidades[i].nombre; 
		pj.habilidades[i].tipo = objeto.habilidades[i].tipo; 
		pj.habilidades[i].desc = objeto.habilidades[i].desc; 
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
		Ch.findOne({charac_id: pj.charac_id}, function(err, chara){
			if(!err){
				if(chara){
						chara.charac_id = objeto.charac_id;
	chara.nombre = objeto.nombre;
	chara.clase = objeto.clase;
	chara.nivel = objeto.nivel;
	chara.na = objeto.na;
	chara.estilo = objeto.estilo;


	//<<<<<<<ATRIBUTOS>>>>>>
	chara.atributos.pv = objeto.atributos.pv;
	chara.atributos.bonuspv = objeto.atributos.bonuspv || 0;
	chara.atributos.cosmos = objeto.atributos.cosmos || 0;
	chara.atributos.bonusApc = objeto.atributos.bonusApc;
	chara.atributos.bonuspc = objeto.atributos.bonuspc || 0;
	chara.atributos.cp = objeto.atributos.cp || 0;
	chara.atributos.pva = objeto.atributos.pva || 0;
	chara.atributos.bonuspva = objeto.atributos.bonuspva || 0;


	// <<<<<<ATAQUES>>>>>>>
	for(var i =1; i<11; i++){
		chara.ataques[i].nombre = objeto.ataque[i].nombre;
		chara.ataques[i].tipo = objeto.ataque[i].tipo;
		chara.ataques[i].especial = objeto.ataque[i].especial;
		chara.ataques[i].daño = objeto.ataque[i].daño;
		chara.ataques[i].bonus = objeto.ataque[i].bonus;
		chara.ataques[i].gasto = objeto.ataque[i].gasto;
	}

	//<<<<<<DEFENSAS>>>>>>>
		for(var i=1; i<11; i++){
		chara.defensas[i].nombre = objeto.defensa[i].nombre;
		chara.defensas[i].tipo = objeto.defensa[i].tipo;
		chara.defensas[i].especial = objeto.defensa[i].especial;
		chara.defensas[i].poder = objeto.defensa[i].poder;
		chara.defensas[i].bonus = objeto.defensa[i].bonus;
		chara.defensas[i].gasto = objeto.defensa[i].gasto;
	}


	// <<<<<<<HABILIDADES>>>>>>
	for(var i =1; i<9; i++){
		chara.habilidades[i].nombre = objeto.habilidades[i].nombre; 
		chara.habilidades[i].tipo = objeto.habilidades[i].tipo; 
		chara.habilidades[i].desc = objeto.habilidades[i].desc; 
		chara.habilidades[i].clave = objeto.habilidades[i].clave; 
	}

	// <<<<<<<SENTIDOS>>>>>>>
	chara.sentidos.vista = objeto.sentidos.vista || 0;
	chara.sentidos.gusto = objeto.sentidos.gusto || 0;
	chara.sentidos.tacto = objeto.sentidos.tacto || 0;
	chara.sentidos.olfato = objeto.sentidos.olfato || 0;
	chara.sentidos.oido = objeto.sentidos.oido || 0;
	chara.sentidos.intuicion = objeto.sentidos.intuicion || 0;
	chara.sentidos.septimo = objeto.sentidos.septimo || 0;
	chara.sentidos.octavo = objeto.sentidos.octavo || 0;
	chara.sentidos.omega = objeto.sentidos.omega || 0;
	chara.sentidos.decimo = objeto.sentidos.decimo || 0;

	// <<<<<<<BASES>>>>>>
	chara.bases.caballero = objeto.bases.caballero;
	chara.bases.af = objeto.bases.af;
	chara.bases.df = objeto.bases.df;
	chara.bases.ac = objeto.bases.ac;
	chara.bases.dc = objeto.bases.dc;
	chara.bases.ap = objeto.bases.ap;
	chara.bases.dp = objeto.bases.dp;
	chara.bases.baf = objeto.bases.baf;
	chara.bases.bdf = objeto.bases.bdf;
	chara.bases.bac = objeto.bases.bac;
	chara.bases.bdc = objeto.bases.bdc;
	chara.bases.bap = objeto.bases.bap;
	chara.bases.bdp = objeto.bases.bdp;
	chara.bases.ba = objeto.bases.ba;
	console.log(chara);
					chara.save({}, callback)
				};
			} else {
				console.log(err);
			};
		});
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