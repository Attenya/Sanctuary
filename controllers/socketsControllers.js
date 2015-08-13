var socket = require('socket.io');

var	usuarios = new Array();


var DB = require('../models/chatModels');
var User = require('../models/users');
var Ch = require('../models/characters');
var Bt = require('../models/battles');
var Escenarios = require('../models/escenarios.js');
var fs = require('fs');
var Not = require('../models/noticias.js');
var Ev = require('../models/eventos.js');

// 
//	Variables de Combates;
//	Batallas = datos personaje (Pv,Cp,Cosmos, etc);
//
//

var batallas = new Object();

var socketsControllers = function(app){
	var io = socket.listen(app);

		io.on('connection', function(socket){
				
				//Evento de socket que controla 
				// que clientes acceden a la web
				// y comprueba si esta conectado o
				// no a la misma
				//

				socket.on('conectar', function(data, bando){
					console.log("ejecutacion conexión");
					socket.usuario = data;
					if(socket.usuario == null || socket.usuario == undefined){
						DB.recargar(function(err, res){

							if(!err){
								console.log("ejecutando recarga sin estar logeado");
								var recibido = res;
								ordenado = recibido.slice(0);
								ordenado.sort(function(a, b) {return a.fecha - b.fecha});
								socket.emit('recargar', ordenado);
								DB.conectados(function(err,res){
									if(!err){
										console.log("ejecutando lista de conectados sin estar logeado")
										socket.emit('conectados', res);
									} else {
										console.log(err);
										return next();
									};
								});
							} else {
								console.log(err);
							};
						
						});

					} else {
						DB.recargar(function(err, res){
							if(!err){
								var recibido = {};
								for(i=9, f=0; i>-1; i--){
									recibido[f] = res[i];
									f++;
								}

								socket.emit('recargar', recibido);
								DB.conectar(data, function(err,res){
									console.log("conectando usuario: "+data);
									if(!err){
										DB.conectados(function(err,res){
											if(!err){
												DB.userRoom(data, function(err, roomy){
													if(roomy.sala != null || roomy.sala != undefined || roomy.sala != ""){
														io.emit('conectados', res);
														io.emit('unirRoom', roomy.sala);
													} else {
														io.emit('conectados', res);
													};
												});
												
											} else {
												console.log(err);
												return next();
											};
										});
									}else {
										console.log(err);
										return next();
									};
								});

							} else {
								console.log(err);
							};
						
						});
						
						usuarios[socket.usuario] = {usuario: socket.usuario, puerto: socket.id, bando: bando, hora_conexion: new Date()};
						

						


					}

				});
				
				// Evento que controla el chat general
				// Guarda todo mensaje recibido y enviado
				// en una base de datos de forma que en caso de 
				// problemas todo esté documentado.
				//

				socket.on('msg', function(usuario, bando, mensaje){
					DB.general(usuario, bando, mensaje, function(err, res){
						if(err){
							console.log(err);
										return next();
						};
						
					});
					enviarGeneral(usuario, bando, mensaje);
				});

				// Evento de socket que controla la desconexión
				// de usuarios de la página actualizando a la vez
				// su estado para que todos lo vean.
				//
				//

				socket.on('disconnect', function(){
					if(socket.usuario ){
						DB.desconectar(socket.usuario, function(err,res){
							if(!err){
								DB.conectados(function(err,res){
									if(!err){
										io.emit('conectados', res);
									} else {
										console.log(err);
										return next();
									};
								});
							}else {
								console.log(err);
								return next();
							}
						});
						
						
						delete usuarios[socket.usuario];
					}
					

				});

				// Evento de socket que controla los mensajes
				// privados.
				//
				//
				//

				socket.on('privado', function(mensaje, receptor, emisor){
					enviarMensaje(mensaje, receptor, emisor);
					/*for(var i=0; i<usuarios.length; i++){
						var p = usuarios[i];
						if(p.usuario == receptor){
							var envio = "<span id='perfil2'>"+receptor+ "</span>: " + mensaje;
							io.sockets.socket(p.socket).emit('prv', envio);
							console.log(receptor+": "+mensaje);
                			break;
						}
					}*/
				
				});

				// Evento Socket que permite visualizar el perfil de un usuario en concreto.
				//  <<<<<<< IMPORTANTE >>>>>>>>>
				// Mejorar para que se peuda ver la lista de personajes que posee el usuario
				// Y las batallas realizadas
				//

				socket.on('perfil', function(data){
					User.findOne({user_id: data}, function(err, user){
						if(err){
							console.log(err);
							return next();
						}
						if(user){
							fs.readFile('./Plantillas Html/perfil.txt', 'utf8', function(err, template){
								if( err ){
        							console.log(err)
   								}else{
       								socket.emit('perfil', user, template);
   								 }
							})

						}
					})
				})

				// Evento de Socket que permite a un administrador 
				// crear la ficha de un personaje y a su vez asignarla
				// a un usuario en caso de que lo pueda poseer.
				//
				//
				socket.on('nuevo_personaje', function(){
					
						

					datos = '<div id="perfil"><div class=" col-md-12"><form id="formPjNew" onsubmit="return false" role="form" class="form-horizontal"><br>';
					datos += '<table class="table">';
					datos += '<tr><td colspan="5"><button type="button" class="libre">Cerrar</button></td></tr>';
					datos += '<tr><th>ID:</th><td><input type="text" class="form-control"  placeholder="Número de Pj" id="id_pj" name="id_pj" class="form-control"></td>';
					datos += '<th>Usuarios</th><td><select id="usuario_pj" class="form-control">'
					User.find({}, function(err, res){
						if(!err){
							var resultado = "";
							for(var i =0; i<res.length; i++){
									datos += '<option value="'+res[i].user_id+'">'+res[i].user_id+'</option>';
							};


							datos += '</select></td><th>Nombre:</th><td>';
					datos += '<input type="text" class="form-control" id="nombre_pj" name="name_pj" class="form-control"></td></tr><tr><th>Nivel</th><td>';
					datos += '<input type="text" class="form-control" id="nivel_pj" name="nivel_pj" class="form-control"></td><th>N.A:</th><td>';
					datos += '<input type="text" class="form-control" id="n_a_pj" name="n_a_pj" class="form-control" ></td><th>Clase Armadura:</th><td>';
					datos += '<input type="text" class="form-control" placeholder="10/20/50/100" id="clase_pj" name="clase_pj" class="form-control"></td></tr><tr><th>Estilo</th><td>';
					datos += '<input type="text" class="form-control" id="estilo_pj" name="estilo_pj" class="form-control"></td><th>Tipo Caballero</th>';
					datos += '<td><input type="text" class="form-control" id="tipo_pj" name="tipo_pj" placeholder="Con,Sin,Acero/Espiritu"></td><th>Elementos</th>';
					datos += '<td><input type="text" class="form-control" id="elemento_pj" name="estilo_pj" placeholder="Elemento1,Elemento2"></td>'
					datos += '</tr><tr><td></td><th>Estado</th><td><input type="text" class="form-control" id="estado_pj" name="estado_pj"></td><th>Armadura</th>';
					datos += '<td><input type="text" class="form-control" id="armadura_pj" name="armadura_pj"></td><td></td></<tr>';
					datos += '<tr><td colspan="6" class="centrado"><h4>Caracteristicas de Personaje</h2></td></tr>';
					datos += '<tr><th colspan="3" class="derecha">Base de Nivel</th><th>Bonus</th><th>Total:</th></tr>';
					datos += '<tr><th colspan="2">Pv</th><td>';
					datos += '<input type="text" class="form-control" id="pv_pj" name="pv_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonuspv_pj" name="bonuspv_pj" class="form-control"></td></tr>';
					datos += '<tr><td><td><th>Base de Nivel</th><th>Bonus Armd.</th><th>Bonus</th></tr>';
					datos += '<tr><th colspan="2">PC:</th><td><input type="text" class="form-control" id="pc_pj" name="pc_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonusApc_pj" name="bonusApc_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonuspc_pj" name="bonuspc_pj" class="form-control"></td></tr>';
					datos += '<tr><th colspan="2">Armadura</th><td><input type="text"  placeholder="Cp" class="form-control" id="cp_pj" name="cp_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control"  placeholder="Pva" id="pva_pj" name="pva_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonuspva_pj" name="bonuspva_pj" class="form-control"></td></tr>';
					datos += '<tr><th colspan="5" class="centrado"><h4>Sentidos<h4></th></tr>';
					datos += '<tr class="centrado"><th>Tacto</th><th>Gusto</th><th>Vista</th><th>Olfato</th><th>Odio</th></tr>';
					datos += '<tr><td><input type="text" class="form-control" id="tacto_pj" name="tacto_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="gusto_pj" name="gusto_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="vista_pj" name="vista_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="olfato_pj" name="olfato_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="oido_pj" name="oido_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="intuicion_pj" name="intuicion_pj" class="form-control"></td></tr>';
					datos += '<tr class="centrado"><th></th><th>7º Sentido</th><th>8º Sentido</th><th>Omega</th><th>10º Sentido</th><th></th></tr>';
					datos += '<tr><td></td><td><input type="text" class="form-control" id="7_pj" name="7_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="8_pj" name="8_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="omega_pj" name="omega_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="10_pj" name="10_pj" class="form-control"></td><td></td></tr>';
					datos += '<tr><th colspan="6" class="centrado"><h4>Técnicas de Ataque</h4></th></tr>';
					datos += '<tr><th>Nombre</th><th>Tipo</th><th>Especiales</th><th>Gasto</th><th>Daño</th><th>Bonus</th></tr>';

					var ataques = 1;
					for(var i =0; i<10;i++){
						datos += '<tr><td><input type="text" class="form-control" id="nm_atk'+ataques+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="tipo_atk'+ataques+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control"  placeholder="Aturdir,Paralizar, etc" id="especial_atk'+ataques+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="gasto_atk'+ataques+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="daño_atk'+ataques+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonus_atk'+ataques+'_pj" class="form-control"></td><tr>';
					ataques++;
					}
				

					//
					// DEFENSAS
					//
					//

					datos += '<tr><th colspan="5" class="centrado"><h4>Técnicas de Defensa</h4></th></tr>';
					datos += '<tr><th>Nombre</th><th>Tipo</th><th>Especiales</th><th>Gasto</th><th>Daño</th><th>Bonus</th></tr>';
					var defensas = 1;
					for(var i =0; i<10;i++){
						datos += '<tr><td><input type="text" class="form-control" id="nm_def'+defensas+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="tipo_def'+defensas+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" placeholder="Aturdir,Paralizar, etc" id="especial_def'+defensas+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="gasto_def'+defensas+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="antidaño_def'+defensas+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonus_def'+defensas+'_pj" class="form-control"></td><tr>';
					defensas++;
					}
				

					//
					//
					//	<<<<<<HABILIDADES>>>>>>
					//
					//

					datos += '<tr><th colspan="5" class="centrado"><h4>Habilidades</h4></th>/<tr>';
					datos += '<tr><th colspan="2">Nombre</th><th>Tipo</th><th>Clave</th><th colspan="2">Descripción</th></tr>';
					//Habilidad 1
					var habilidad = 1;
					for(var i = 0; i<8; i++){
						datos +=  '<tr><td colspan="2"><input type="text" class="form-control" id="nombre_hab'+habilidad+'_pj" class="form-control"></td>';
						datos +=  '<td><input type="text" class="form-control" id="tipo_hab'+habilidad+'_pj" class="form-control"></td>';
						datos +=  '<td><input type="text" class="form-control" data-container="body" data-toggle="popover" data-placement="right" data-content="Click en el siguiente link para saber las claves"  title="CLAVES" id="clave_hab'+habilidad+'_pj" class="form-control"></td>';
						datos +=  '<td colspan="2"><textarea rows="3" cols="10" class="form-control" id="descripcion_hab'+habilidad+'_pj" class="form-control"></textarea></td></tr>';
						habilidad++;
					};

					//
					//
					//	<<<<<<< BASES >>>>>>>
					//
					//

					datos += '<tr><th>Bases</th><th>Base Pj</th><th>Base Cab.</th><th>Base Arm.</th><th>Bonus</th></tr>';

					//
					//
					// <<<<<< ATAQUE FISICO >>>>>>
					//
					//


					datos += '<tr><th>A. Físico</th>';
					datos += '<td rowspan="6"><input type="text" class="form-control" id="baseCaballero" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="afbc_pj" class="form-control"></td>';
					datos += '<td  rowspan="6"><input type="text" class="form-control" id="ba_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="afb_pj" class="form-control"></td></tr>';

					//
					//
					// <<<<<< DEFENSA FISICA >>>>>>
					//
					//


					datos += '<tr><th>D. Física</th>';
					datos += '<td><input type="text" class="form-control" id="dfbc_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="dfb_pj" class="form-control"></td></tr>';

					//
					//
					// <<<<<< ATAQUE COSMICO >>>>>>
					//
					//


					datos += '<tr><th>A. Cosmico</th>';
					datos += '<td><input type="text" class="form-control" id="acbc_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="acb_pj" class="form-control"></td></tr>';

					//
					//
					// <<<<<< DEFENSA COSMICA >>>>>>
					//
					//


					datos += '<tr><th>D. Cosmica</th>';
					datos += '<td><input type="text" class="form-control" id="dcbc_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="dcb_pj" class="form-control"></td></tr>';

					//
					//
					// <<<<<< ATAQUE PSIQUICO >>>>>>
					//
					//


					datos += '<tr><th>A. Psiquico</th>';
					datos += '<td><input type="text" class="form-control" id="apbc_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="apb_pj" class="form-control"></td></tr>';

					//
					//
					// <<<<<< DEFENSA PSIQUICA >>>>>>
					//
					//


					datos += '<tr><th>D: Psiquica</th>';
					datos += '<td><input type="text" class="form-control" id="dpbc_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="dpb_pj" class="form-control"></td></tr>';

					datos +='</table><button type="button" id="enviarPJ" class="btn btn-primary" value="nuevo">Enviar Pj</button></form></div></div>';
					socket.emit('recibir_nuevo_personaje', datos);
				}

					});
					
						
				
				});

				// Evento de socket que recibe y guarda los datos
				// del personaje creado.
				//
				//
				//

				socket.on('nuevo_pj', function(pj){
					Ch.crearPJ(pj, "nuevo", function(err){
						if(err){
							console.log(err);
						};
					})
				})

				// Evento de socket que permite al administrador
				// editar las fichas de los personajes que 
				// en este momento hayan disponibles
				//
				//

				socket.on('editar_personaje', function(){
					Ch.verPJ(function(err, res){
						if(!err){
							if(res){
								var pj = res;
								socket.emit('listaPj', pj);
							} else {
								datos = null;
								socket.emit('listaPj', datos);
							};
						} else {
							console.log(err);
							return next();
						}
					});

				});
				
				// Evento de socket, que toma un valor (id)
				// y busca en la base de datos la información
				// requerida para luego ser mostrada.
				//
				//

				socket.on('editarPj', function(id){
					Ch.buscarPJ(id, function(err, res){
						if(!err){
							if(res){

							console.log("Enviando formulario...");
					datos = '<div id="perfil"><div class=" col-md-12"><form id="formPjEdit" onsubmit="return false" role="form" class="form-horizontal"><br>';
					datos += '<table class="table">';
					datos += '<tr><td colspan="5"><button type="button" class="libre">Cerrar</button></td></tr>';
					datos += '<tr><th>Id</th><td>';
					datos += '<input type="text" class="form-control"  placeholder="Número de Pj" id="id_pj" name="id_pj" class="form-control" value="'+res.charac_id+'"></td>';
					datos += '<th>Usuarios</th><td><select id="usuario_pj" class="form-control">';
					User.find({}, function(err,res2){
						if(!err){
							var resultado = "";
							for(var i =0; i<res2.length; i++){
								if(res2[i].user_id == res.usuario){
									datos += '<option value="'+res2[i].user_id+'" selected>'+res2[i].user_id+'</option>';
								}else{
									datos += '<option value="'+res2[i].user_id+'">'+res2[i].user_id+'</option>';
								}
							}
					datos += '</select></td><th>Nombre:</th><td>';
					datos += '<input type="text" class="form-control" id="nombre_pj" name="name_pj" class="form-control" value="'+res.nombre+'"></td></tr><tr><th>Nivel</th><td>';
					datos += '<input type="text" class="form-control" id="nivel_pj" name="nivel_pj" class="form-control" value="'+res.nivel+'"></td><th>N.A:</th><td>';
					datos += '<input type="text" class="form-control" id="n_a_pj" name="n_a_pj" class="form-control"  value="'+res.na+'"></td><th>Clase Armadura:</th><td>';
					datos += '<input type="text" class="form-control" placeholder="10/20/50/100" id="clase_pj" name="clase_pj" class="form-control" value="'+res.clase+'"></td></tr><tr><th>Estilo</th><td>';
					datos += '<input type="text" class="form-control" id="estilo_pj" name="estilo_pj" class="form-control"  value="'+res.estilo+'"></td><th>Tipo Caballero</th>';
					datos += '<td><input type="text" class="form-control" id="tipo_pj" name="tipo_pj" value="'+res.tipo+'"></td><th>Elementos</th>';
					datos += '<td><input type="text" class="form-control" id="elemento_pj" name="estilo_pj" value="'+res.elementos+'"></td>'
					datos += '</tr><tr><td></td><th>Estado</th><td><input type="text" class="form-control" id="estado_pj" name="estado_pj" value="'+res.estado+'"></td><th>Armadura</th>';
					datos += '<td><input type="text" class="form-control" id="armadura_pj" name="armadura_pj" value="'+res.armadura+'"></td><td></td></<tr>';
					datos += '</tr><tr><td colspan="6" class="centrado"><h4>Caracteristicas de Personaje</h2></td></tr>';
					datos += '<tr><th colspan="3" class="derecha">Base de Nivel</th><th>Bonus</th><th>Total:</th></tr>';
					datos += '<tr><th colspan="2">Pv</th><td>';
					datos += '<input type="text" class="form-control" id="pv_pj" value="'+res.atributos.pv+'" name="pv_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonuspv_pj" name="bonuspv_pj" value="'+res.atributos.bonuspv+'" class="form-control"></td></tr>';
					datos += '<tr><td><td><th>Base de Nivel</th><th>Bonus Armd.</th><th>Bonus</th></tr>';
					datos += '<tr><th colspan="2">PC:</th><td><input type="text" class="form-control" id="pc_pj" value="'+res.atributos.cosmos+'" name="pc_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonusApc_pj" value="'+res.atributos.bonusApc+'" name="bonusApc_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonuspc_pj" value="'+res.atributos.bonuspc+'" name="bonuspc_pj" class="form-control"></td></tr>';
					datos += '<tr><th colspan="2">Armadura</th><td><input type="text"  placeholder="Cp" value="'+res.atributos.cp+'" class="form-control" id="cp_pj" name="cp_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control"  placeholder="Pva" value="'+res.atributos.pva+'" id="pva_pj" name="pva_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonuspva_pj" value="'+res.atributos.bonuspva+'" name="bonuspva_pj" class="form-control"></td></tr>';
					datos += '<tr><th colspan="5" class="centrado"><h4>Sentidos<h4></th></tr>';
					datos += '<tr class="centrado"><th>Tacto</th><th>Gusto</th><th>Vista</th><th>Olfato</th><th>Odio</th></tr>';
					datos += '<tr><td><input type="text" class="form-control" id="tacto_pj" value="'+res.sentidos.tacto+'" name="tacto_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="gusto_pj" value="'+res.sentidos.gusto+'" name="gusto_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="vista_pj" value="'+res.sentidos.vista+'" name="vista_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="olfato_pj" value="'+res.sentidos.olfato+'" name="olfato_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="oido_pj" value="'+res.sentidos.oido+'" name="oido_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="intuicion_pj" value="'+res.sentidos.intuicion+'" name="intuicion_pj" class="form-control"></td></tr>';
					datos += '<tr class="centrado"><th></th><th>7º Sentido</th><th>8º Sentido</th><th>Omega</th><th>10º Sentido</th><th></th></tr>';
					datos += '<tr><td></td><td><input type="text" class="form-control" id="7_pj" name="7_pj" value="'+res.sentidos.septimo+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="8_pj" name="8_pj" value="'+res.sentidos.octavo+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="omega_pj" name="omega_pj" value="'+res.sentidos.omega+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="10_pj" name="10_pj" value="'+res.sentidos.decimo+'" class="form-control"></td><td></td></tr>';
					datos += '<tr><th colspan="6" class="centrado"><h4>Técnicas de Ataque</h4></th></tr>';
					datos += '<tr><th>Nombre</th><th>Tipo</th><th>Especiales</th><th>Gasto</th><th>Daño</th><th>Bonus</th></tr>';

					var ataques = 1;
					for(var i =0; i<10;i++){
						datos += '<tr><td><input type="text" class="form-control" id="nm_atk'+ataques+'_pj" class="form-control" value="'+res.ataques[ataques].nombre+'"></td>';
					datos += '<td><input type="text" class="form-control" id="tipo_atk'+ataques+'_pj" class="form-control" value="'+res.ataques[ataques].tipo+'"></td>';
					datos += '<td><input type="text" class="form-control"  placeholder="Aturdir,Paralizar, etc" value="'+res.ataques[ataques].especial+'" id="especial_atk'+ataques+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="gasto_atk'+ataques+'_pj" value="'+res.ataques[ataques].gasto+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="daño_atk'+ataques+'_pj" value="'+res.ataques[ataques].daño+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonus_atk'+ataques+'_pj" value="'+res.ataques[ataques].bonus+'" class="form-control"></td><tr>';
					ataques++;
					}
				

					//
					// DEFENSAS
					//
					//

					datos += '<tr><th colspan="5" class="centrado"><h4>Técnicas de Defensa</h4></th></tr>';
					datos += '<tr><th>Nombre</th><th>Tipo</th><th>Especiales</th><th>Gasto</th><th>Daño</th><th>Bonus</th></tr>';
					var defensas = 1;
					for(var i =0; i<10;i++){
						datos += '<tr><td><input type="text" class="form-control" id="nm_def'+defensas+'_pj" value="'+res.defensas[defensas].nombre+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="tipo_def'+defensas+'_pj" value="'+res.defensas[defensas].tipo+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" placeholder="Aturdir,Paralizar, etc" value="'+res.defensas[defensas].especial+'" id="especial_def'+defensas+'_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="gasto_def'+defensas+'_pj" value="'+res.defensas[defensas].gasto+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="antidaño_def'+defensas+'_pj" value="'+res.defensas[defensas].poder+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="bonus_def'+defensas+'_pj" value="'+res.defensas[defensas].bonus+'" class="form-control"></td><tr>';
					defensas++;
					}
				

					//
					//
					//	<<<<<<HABILIDADES>>>>>>
					//
					//

					datos += '<tr><th colspan="5" class="centrado"><h4>Habilidades</h4></th>/<tr>';
					datos += '<tr><th colspan="2">Nombre</th><th>Tipo</th><th>Clave</th><th colspan="2">Descripción</th></tr>';
					//Habilidad 1
					var habilidad = 1;
					for(var i = 0; i<8; i++){
						datos +=  '<tr><td colspan="2"><input type="text" class="form-control" id="nombre_hab'+habilidad+'_pj" value="'+res.habilidades[habilidad].nombre+'" class="form-control"></td>';
						datos +=  '<td><input type="text" class="form-control" id="tipo_hab'+habilidad+'_pj" value="'+res.habilidades[habilidad].tipo+'" class="form-control"></td>';
						datos +=  '<td><input type="text" class="form-control" data-container="body" data-toggle="popover" data-placement="right" value="'+res.habilidades[habilidad].clave+'" data-content="Click en el siguiente link para saber las claves"  title="CLAVES" id="clave_hab'+habilidad+'_pj" class="form-control"></td>';
						datos +=  '<td colspan="2"><textarea rows="3" cols="10" class="form-control" id="descripcion_hab'+habilidad+'_pj" class="form-control">'+res.habilidades[habilidad].desc+'</textarea></td></tr>';
						habilidad++;
					};

					//
					//
					//	<<<<<<< BASES >>>>>>>
					//
					//

					datos += '<tr><th>Bases</th><th>Base Pj</th><th>Base Cab.</th><th>Base Arm.</th><th>Bonus</th></tr>';

					//
					//
					// <<<<<< ATAQUE FISICO >>>>>>
					//
					//


					datos += '<tr><th>A. Físico</th>';
					datos += '<td rowspan="6"><input type="text" class="form-control" id="baseCaballero" value="'+res.bases.caballero+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="afbc_pj" value="'+res.bases.af+'" class="form-control"></td>';
					datos += '<td rowspan="6"><input type="text" class="form-control" value="'+res.bases.ba+'" id="ba_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="afb_pj" value="'+res.bases.baf+'" class="form-control"></td></tr>';

					//
					//
					// <<<<<< DEFENSA FISICA >>>>>>
					//
					//


					datos += '<tr><th>D. Física</th>';
					datos += '<td><input type="text" class="form-control" id="dfbc_pj" value="'+res.bases.df+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="dfb_pj"  value="'+res.bases.bdf+'"class="form-control"></td></tr>';

					//
					//
					// <<<<<< ATAQUE COSMICO >>>>>>
					//
					//


					datos += '<tr><th>A. Cosmico</th>';
					datos += '<td><input type="text" class="form-control" id="acbc_pj" value="'+res.bases.ac+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="acb_pj" value="'+res.bases.bac+'" class="form-control"></td></tr>';

					//
					//
					// <<<<<< DEFENSA COSMICA >>>>>>
					//
					//


					datos += '<tr><th>D. Cosmica</th>';
					datos += '<td><input type="text" class="form-control" id="dcbc_pj" value="'+res.bases.dc+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="dcb_pj" value="'+res.bases.bdc+'" class="form-control"></td></tr>';

					//
					//
					// <<<<<< ATAQUE PSIQUICO >>>>>>
					//
					//


					datos += '<tr><th>A. Psiquico</th>';
					datos += '<td><input type="text" class="form-control" id="apbc_pj" value="'+res.bases.ap+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="apb_pj" value="'+res.bases.bap+'" class="form-control"></td></tr>';

					//
					//
					// <<<<<< DEFENSA PSIQUICA >>>>>>
					//
					//


					datos += '<tr><th>D: Psiquica</th>';
					datos += '<td><input type="text" class="form-control" id="dpbc_pj" value="'+res.bases.dp+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="dpb_pj" value="'+res.bases.bdp+'" class="form-control"></td></tr>';

					datos +='</table><button type="button" id="enviarPJ" class="btn btn-primary" value="actualizar">Enviar Pj</button></form></div></div>';
					socket.emit('formPjEdit', datos);
						}
					})
					
				}
						} else{
							console.log(err);
							return next();
						};
					});
				});

				// Evento de Socket que permite al administrador
				// editar una ficha concreta de la base de datos
				// con los datos nuevos del formulario.
				//
				//

				socket.on("actualizarPJ", function(pj){
					console.log("Se procede a actualizar");
					console.log(pj);
					Ch.crearPJ(pj, "actualizar", function(err){
						if(err){
							console.log(err);
						};
					});
				});


				// Evento de socket que permite al administrador
				// eliminar una ficha concreta de la base
				// de datos.
				//
				//

				socket.on('eliminarPj',function(personaje){
					Ch.eliminarPJ(personaje, function(err, res){
						if(err){
							console.log(err);
						};

						if(res){
							console.log("Ficha con ID: "+personaje+" ha sido eliminada");
							socket.emit('aviso', "Ficha Eliminada con Exito");
						};
					});
				});

				// Evento de sockets que permite al administrador 
				// acceder al panel de administración y poder hacer
				// y deshacer a su antojo
				//
				//

				socket.on('administracion', function(){
					datos = '<div id="panel_administracion" class="col-md-6"><button type="button" class="close"><span class="libre" aria-hidden="false">&times;</span><span class="sr-only">Close</span></button><h3>Panel de Administracion</h3>';
					datos +='<ul class="col-md-12"><li><div class="btn btn-primary btn-lg btn-block" id="nuevo_personaje">Añadir Personaje</div></li><li><div class="btn btn-primary btn-lg btn-block" id="editarPj">Editar Personaje</div></li>';
					datos +='<li><div class="btn btn-primary btn-lg btn-block">Eventos Web</div></li><li><div class="btn btn-primary btn-lg btn-block">Noticias</div></li>';
					datos +='<li><div class="btn btn-primary btn-lg btn-block">Moderar Batallas</div></li><li><div class="btn btn-primary btn-lg btn-block">Moderar Ranking</div></li></ul></div><br/><br/><br/>';
					socket.emit('recibir_administracion', datos);
				});
				
				// Evento de socket que permite al usuario registrado y conectado
				// crear una batalla nueva.
				//
				//
				//
				socket.on("battleForm", function(usuario){
					datos = '<div id="battle"><div class=" col-md-12"><form id="batForm" onsubmit="return false"><br>\
					<div class="col-md-12">\
						<button type="button" class="libre">Cerrar</button>\
					</div>\
					<div class="col-md-6">\
					<div class="form-group col-md-12">\
						<label for="batTitulo" class="col-md-4 control-label">Titulo</label>\
						<div class="col-md-8">\
							<input type="text" class="form-control" id="batTitulo">\
						</div>\
					</div>\
					<div class="form-group col-md-12">\
						<label for="batPass" class="col-md-4 control-label">Contraseña:</label>\
						<div class="col-md-8">\
							<input type="password" class="form-control" id="batPass" placeholder="Opcional">\
						</div>\
					</div>\
					<div class="form-group col-md-12">\
						<label for="estilo_bt" class="col-md-4 control-label">Estilo</label>\
						<div class="col-md-8">\
							<select id="estilo_bt" class="form-control">\
							<option value="1vs1">1vs1</option>\
							<option value="1vs2">1vs2</option>\
							<option value="2vs3">2vs3</option>\
							<option value="3vs1">3vs1</option>\
							<option value="3vs3">3vs3</option>\
							<option value="1vs1vs1vs1">1vs1vs1vs1</option>\
							</select>\
						</div>\
					</div>\
					<div class="form-group col-md-12">\
						<label for="pjList" class="col-md-4 control-label">Personaje</label>\
						<div class="col-md-8">\
							<select id="pjList" class="form-control">\
							<option value="ninguno">Elige Personaje</option>';
					Ch.buscarPJ2(usuario, function(err,res){
						if(!err){
							for(var i = 0; i<res.length; i++){
								datos += '<option value="'+res[i].charac_id+'">'+res[i].nombre+'  Nivel: '+res[i].nivel+'</option>';

							};

							datos += '</select></div>\
								</div></div>\
					<div class="col-md-6"><div id="pjAvatar"><img src="" class="img-thumbnail avatar"></div>\
					<div class="col-md-4" id="pF"><div class="potenciaFisica"></div></div><div class="col-md-4">b</div><div class="col-md-4">c</div>\
					</div>\
					<div class="col-md-6" id="dataPJ"></div>\
					</div>\
							 ';
							socket.emit('battleForm2', datos);
						};

					});
					
				});



				socket.on("habForm", function(id){
					Ch.buscarPJ(id, function(err, res){
						if(!err){
							socket.emit("habForm2", res);
						};
					});
				});


				socket.on("EscPrin", function(id){

					var escenarios = '<select class="form-control" id="escenario2_bat"><option>Elige Escenario Secundario</option>';
					var descripcion = Escenarios.esc[id].descripcion;
					if(id == 7){
						id++
						for(var i=id; i<38; i++){
							escenarios +='<option value="'+i+'">'+Escenarios.esc[i].nombre+'</option>'
						};
						escenarios += '</select>';
						socket.emit("EscSec", escenarios, descripcion);
					} else {
						if(id == 40){
							id++
							for(var i=id; i<52; i++){
								escenarios +='<option value="'+i+'">'+Escenarios.esc[i].nombre+'</option>'
							};
							escenarios += '</select>';
							socket.emit("EscSec", escenarios, descripcion);
						}else{
							if(id == 52){
								id++
								for(var i=id; i<70; i++){
									escenarios +='<option value="'+i+'">'+Escenarios.esc[i].nombre+'</option>'
								};
								escenarios += '</select>';
								socket.emit("EscSec", escenarios, descripcion);
							}else{

								if(id == 70){
									id++
									for(var i=id; i<111; i++){
										escenarios +='<option value="'+i+'">'+Escenarios.esc[i].nombre+'</option>'
									};
									escenarios += '</select>';
									socket.emit("EscSec", escenarios, descripcion);
								}else{
									if(id == 111){
										id++
										for(var i=id; i<124; i++){
											escenarios +='<option value="'+i+'">'+Escenarios.esc[i].nombre+'</option>'
										};
										escenarios += '</select>';
										socket.emit("EscSec", escenarios, descripcion);
									}else{
										if(id == 124){
											id++
											for(var i=id; i<137; i++){
												escenarios +='<option value="'+i+'">'+Escenarios.esc[i].nombre+'</option>'
											};
											escenarios += '</select>';
											socket.emit("EscSec", escenarios, descripcion);
										}else{
												if(id == 137){
													id++
													for(var i=id; i<140; i++){
														escenarios +='<option value="'+i+'">'+Escenarios.esc[i].nombre+'</option>'
													};
													escenarios += '</select>';
													socket.emit("EscSec", escenarios, descripcion);
												}else{
														if(id == 160){
															id++
															for(var i=id; i<166; i++){
																escenarios +='<option value="'+i+'">'+Escenarios.esc[i].nombre+'</option>'
															};
															escenarios += '</select>';
															socket.emit("EscSec", escenarios, descripcion);
														}else{
																escenarios += '<option>Ningún Escenario Secundario</option></select>';
																socket.emit("EscSec", escenarios, descripcion);
														};
												};

										};

									};
								};

							};
						};
					};

				});

				socket.on("tablon", function(){
					Not.bus5(function(err, noticias){
            			if(!err){
            				fs.readFile('./Plantillas Html/tablon.txt', 'utf8', function(err2, template){
            					if(!err2){
            						socket.emit("tablonCompleto", noticias, template);
            					}
            				})
            			}
       			 	})
				})

				// FUNCIÓN MODERATIVA Y ADMINISTRATIVA:
				// MENSAJES DE SISTEMA GENERALES:
				//
				//	MENSAJES GENERALES BÁSICO
				//

				socket.on("msjGeneral1", function(usuario, mensaje, id_bando){
					var html = '<li class="msjGeneral1"><span class="'+id_bando+'">'+usuario+': </span>'+mensaje+'</li>';
					io.emit("msjGeneral1", html);
				})
				
				// FUNCION DE PRUEBA PARA HANDLEBARS EACH
				//
				//
				//

				socket.on("Portal", function(){
					console.log("Accediendo a Portal de Moderación");
					User.find({}).sort({$natural:-1}).limit(5).exec(function(err, users){
						if(users){
							Ch.verPJ(function(err, pjs){
								if(!err){
									if(pjs){
										var pjTotales = 0;
										for(var i=0; i<pjs.length; i++){
											pjTotales++
										}
										Not.bus5(function(err, noticias){
											if(noticias){
												fs.readFile('./Plantillas Html/portal.txt', 'utf8', function(err, template){
													if( err ){
        												console.log(err)
   													}else{
       											 		socket.emit('portal', users, template, pjTotales, noticias);
   													}
												})
											}
										})

									}else{
										var PjTotales = 0
										Not.bus5(function(err, noticias){
											if(noticias){
												fs.readFile('./Plantillas Html/portal.txt', 'utf8', function(err, template){
													if( err ){
        												console.log(err)
   													}else{
       											 		socket.emit('portal', users, template, pjTotales, noticias);
   													}
												})
											}
										})
									}
								} else {
									console.log(err);
								}

							})
							
						}
					})
				});

				socket.on("SPortal", function(){
					console.log("Accediendo a Portal de SuperModeración");
					User.find({}).sort({$natural:-1}).limit(5).exec(function(err, users){
						if(users){
							Ch.verPJ(function(err, pjs){
								if(!err){
									if(pjs){
										var pjTotales = 0;
										for(var i=0; i<pjs.length; i++){
											pjTotales++
										}
										Not.bus5(function(err, noticias){
											if(noticias){
												fs.readFile('./Plantillas Html/Sportal.txt', 'utf8', function(err, template){
													if( err ){
        												console.log(err)
   													}else{
       											 		socket.emit('Sportal', users, template, pjTotales, noticias);
   													}
												})
											}
										})

									}else{
										var PjTotales = 0
										Not.bus5(function(err, noticias){
											if(noticias){
												fs.readFile('./Plantillas Html/Sportal.txt', 'utf8', function(err, template){
													if( err ){
        												console.log(err)
   													}else{
       											 		socket.emit('Sportal', users, template, pjTotales, noticias);
   													}
												})
											}
										})
									}
								} else {
									console.log(err);
								}

							})
							
						}
					})
				});

				socket.on("Noticias", function(){
					console.log("Accediendo al Panel de Moderación -  Noticias");
					Not.buscarNot(function(err1, noticias){
						if(!err1){
							fs.readFile('./Plantillas Html/noticias.txt', 'utf8', function(err2, template){
								if(!err2){
									socket.emit("Noticias", noticias, template);
								}
							})
						}
					})
				})

				socket.on("noticiaNueva", function(noticia){
					Not.crearNot(noticia, function(err){
						if(err){
							console.log(err);
						}

					})
				})

				socket.on("buscarNoticia", function(id){
					Not.buscarNoticia(id, function(err, noticia){
						if(!err){
							User.find({user_id: noticia[0].autor}).exec(function(err2, user){
								if(!err2){
									console.log(user);
									fs.readFile('./Plantillas Html/prevNoticia.txt', 'utf8', function(err2, template){
										socket.emit("prev", noticia, template, user);
									})
								}
							})
						}
					})
				})

				socket.on("borrarNoticia", function(id){
					Not.borrarNoticia(id, function(err){
						if(err){
							console.log(err);
						}
					})
				})

				 /*Funciones Destinadas AL panel de Moderación -  Usuarios*/

				 /*Buscar un usuario concreto por su ID*/

				 socket.on("buscarUsuario", function(id_usuario, fin){
				 	User.find({user_id: id_usuario}).exec(function(err, user){
				 		if(!err){
				 			if(fin == "busqueda"){
				 				socket.emit("usuarioEncontrado", user, "nada", "busqueda");
				 			} else {
				 				fs.readFile('./Plantillas Html/editUsuarios.txt', 'utf8', function(err2, template){
				 					socket.emit("usuarioEncontrado", user, template, "edicion");
				 				})
				 				
				 			}
				 		}
				 	})
				 })

				 /*Buscar todos los usuarios ordenados por su ID*/

				 socket.on('Usuarios', function(){
				 	User.find({}).sort({user_id: 1}).exec(function(err, users){
				 		if(!err){
				 			fs.readFile("./Plantillas Html/usuarios.txt", 'utf8', function(err2, template){
				 				socket.emit("listaUsuarios", users, template);
				 			})
				 		}
				 	})
				 });

				 /*Buscar los PJs con los que esta relacion un Usuario*/

				 socket.on('userPJ', function(user_id){
				 	Ch.pjUser(user_id, function(err, pjs){
				 		if(!err){
				 			var pjTotales = 0;
							for(var i=0; i<pjs.length; i++){
								pjTotales++
							}
							if(pjTotales >= 1){
										socket.emit("userPJ", pjs, pjTotales);
							} else {
								Ch.verPJ(function(err2, pjs2){
									if(!err2){
										socket.emit("userPJ", pjs2, 0)
									}
								})
							}
				 		}
				 	})
				 })

				 /*Recibir y Guardar los datos del usuario editado*/

				 socket.on("editarUsuario", function(us){
				 	User.findOne({user_id: us.user_id}).exec(function(err, user){
				 		if(!err){
				 			user.user_id = us.user_id;
				 			user.avatar = us.avatar;
				 			user.badges = us.badges;
				 			user.range = us.range;
				 			user.bando = us.bando;
				 			user.mail = us.mail;
				 			user.save(function(err){
				 				if(err){
				 					console.log(err);
				 				} else {
				 					User.find({}).sort({user_id: 1}).exec(function(err, users){
				 						if(!err){
				 							fs.readFile("./Plantillas Html/usuarios.txt", 'utf8', function(err2, template){
				 								socket.emit("listaUsuarios", users, template);
				 							})
				 						}
				 					})
				 				}
				 			})
				 		}
				 	})
				 })

				 /*Borraro Usuario Si no es Administrador - Supermoderador - Moderador*/

				 socket.on("borrarUsuario", function(us){
				 	User.findOne({user_id: us}).exec(function(err, user){
				 		if(!err){
				 			if(user.range == 4 || user.range == 5 || user.range == 6){
				 				socket.emit("err", "borrarStaff")
				 			} else {
				 				user.remove();
				 				User.find({}).sort({user_id: 1}).exec(function(err, users){
				 					if(!err){
				 						fs.readFile("./Plantillas Html/usuarios.txt", 'utf8', function(err2, template){
				 							socket.emit("listaUsuarios", users, template);
				 						})
				 					}
				 				})
				 			}
				 		}
				 	})
				 })

				 /*Funciones del panel de Moderación - Batallas */

				 /* Búsqueda de Todas las Batallas Activas en Este Momento*/

				socket.on("Batallas", function(){
					Bt.bscBat(function(err, bat){
						if(!err){
							fs.readFile("./Plantillas Html/modBatallas.txt", 'utf8', function(err2, template){
								if(!err){
									socket.emit("batMod", bat, template);
								}
							})
						}
					})
				})

				/*Funciones del panel de Moderación - Eventos y Torneos */

				socket.on("Eventos y Torneos", function(){
					Ev.bscE(function(err, evento){
						if(!err){
							fs.readFile("./Plantillas Html/EventosYTorneos.txt", 'utf8', function(err1, template){
								if(!err1){
									socket.emit("Eventos y Torneos", evento, template)
								}
							})
						}
					})
				})


				var pepito =  function(){	
				 		for(var user in usuarios){
				 					var f1 = new Date();
				 					var f2 = new Date();
				 					f1.setHours(f1.getHours(), f1.getMinutes(), f1.getSeconds());
				 					f2.setHours(usuarios[user].hora_conexion.getHours(), usuarios[user].hora_conexion.getMinutes(), usuarios[user].hora_conexion.getSeconds());
				 					f1.setHours(f1.getHours()-f2.getHours(), f1.getMinutes()-f2.getMinutes(), f1.getSeconds()-f2.getSeconds());
				 					if(f1.getMinutes() >= 1){
				 						delete usuarios[user];
				 						console.log("El usuario "+user+" ha sido desconectado del chat por inactividad");
				 					}
				 			
				 						 		
				 		}
				 }

				 

		var enviarMensaje = function (mensaje, receptor, emisor) {
					var envio = "<span id='perfil2'>>>"+emisor+ "</span>: " + mensaje;
					if(usuarios.hasOwnProperty(receptor)){
						io.to(usuarios[receptor].puerto).emit('prv', envio);
						console.log(emisor+": "+mensaje);
					} else {
						socket.emit('errorPrivado', receptor);
					}
		};

		var enviarGeneral = function(emisor, bando, mensaje){
					var envio = "<span id='perfil2' class='"+bando+"'>"+emisor+"</span>: "+mensaje;				
					io.emit('chat', envio);
					console.log(emisor+": "+mensaje);		
		};


		});





// Funciones generales:
//
// 1º Funcion que extrae un dato ya repetido en un
// array multiple.

var eliminaDoble = function (arr) {
 var i,
     len=arr.length,
     out=[],
     obj={};

 for (i=0;i<len;i++) {
    obj[arr[i]]=0;
 }
 for (i in obj) {
    out.push(i);
 }
 return out;
}


//
//
//
//
};

// Funcion que envia mensajes privados
// a un socket concreto
//
//

module.exports = socketsControllers;