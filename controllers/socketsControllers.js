var socket = require('socket.io');

var	usuarios = new Array();


var DB = require('../models/chatModels');
var User = require('../models/users');
var Ch = require('../models/characters');

var socketsControllers = function(app){
	var io = socket.listen(app);

		io.on('connection', function(socket){
			console.log("pepito");
				
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
												io.emit('conectados', res);
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
						
						usuarios[socket.usuario] = {usuario: socket.usuario, puerto: socket.id, bando: bando};
						

						


					}

				});
				
				// Evento que controla el chat general
				// Guarda todo mensaje recibido y enviado
				// en una base de datos de forma que en caso de 
				// problemas todo esté documentado.
				//

				socket.on('msg', function(usuario, bando, mensaje){
					DB.general(usuario, mensaje, function(err, res){
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
							datos = '<div id="perfil"><button type="button" class="libre">Cerrar</button>';
							datos += '<div class="col-xs-3 col-sm-3"><img src="" class="img-thumbnail imagen2">';
							datos += user.avatar;
							datos += '</div><div class="col-sx-6 col-sm-6"><br><label class="col-sm-6 control-label">Usuario</label><div class="col-sm-6">';
							datos += user.user_id;
							datos += '</div></div><div class="col-sx-6 col-sm-6"><br><label class="col-sm-6 control-label">Fecha de Inscripción</label><div class="col-sm-6">';
							datos += user.created_at;
							datos +='</div></div><div class=" col-sx-6 col-sm-6"><br><label class="col-sm-6 control-label"> Correo</label><div class="col-sm-6">';
							datos += user.mail;
							datos +='</div></div><div class="col-sx-12 col-sm-12"></br><div class="col-sx-3 col-sm-3"><label class="col-sm-6 control-label"> Rango:</label><div class="col-sm-6">';
							datos += user.range;
							datos += '</div></div><div class="col-sx-3 col-sm-3"><label class="col-sm-6 control-label">Medallas</label><div class="col-sm-6">';
							datos += user.badges;
							datos +='</div></div><div class="col-sx-6 col-sm-6"><label class="col-sm-6 control-label">Bando</label><div class="col-sm-6">';
							datos += user.bando;
							datos += '</div></div><br><div class="col-sx-12 col-sm-12 divisor"><h4>Log de Batallas Realizadas</h4></div><br><div class="col-sx-12 col-sm-12 divisor"><h4>Personajes</h4></div><div class="personaje"></div></div>';
							socket.emit('perfil', datos);
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
					datos += '<tr><th>ID:</th><th>Nombre:</th><th>Nivel:</th><th>N.A:</th><th>Clase Armadura</th><th>Estilo</th></tr><tr><td>';
					datos += '<input type="text" class="form-control"  placeholder="Número de Pj" id="id_pj" name="id_pj" class="form-control"></td><td>';
					datos += '<input type="text" class="form-control" id="nombre_pj" name="name_pj" class="form-control"></td><td>';
					datos += '<input type="text" class="form-control" id="nivel_pj" name="nivel_pj" class="form-control"></td><td>';
					datos += '<input type="text" class="form-control" id="n_a_pj" name="n_a_pj" class="form-control"></td><td>';
					datos += '<input type="text" class="form-control" placeholder="10/20/50/100" id="clase_pj" name="clase_pj" class="form-control"></td><td>';
					datos += '<input type="text" class="form-control" id="estilo_pj" name="estilo_pj" class="form-control"></td>';
					datos += '</tr><tr><td colspan="5" class="centrado"><h4>Caracteristicas de Personaje</h2></td></tr>';
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
					datos += '<td><input type="text" class="form-control" id="oido_pj" name="oido_pj" class="form-control"></td></tr>';
					datos += '<tr class="centrado"><th>Intuición</th><th>7º Sentido</th><th>8º Sentido</th><th>Omega</th><th>10º Sentido</th></tr>';
					datos += '<tr><td><input type="text" class="form-control" id="intuicion_pj" name="intuicion_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="7_pj" name="7_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="8_pj" name="8_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="omega_pj" name="omega_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="10_pj" name="10_pj" class="form-control"></td></tr>';
					datos += '<tr><th colspan="5" class="centrado"><h4>Técnicas de Ataque</h4></th></tr>';
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
					datos += '<td><input type="text" class="form-control" id="daño_def'+defensas+'_pj" class="form-control"></td>';
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
								console.log(res);
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
					console.log(id);
					Ch.buscarPJ(id, function(err, res){
						if(!err){
							if(res){
							console.log("Enviando formulario...")
					datos = '<div id="perfil"><div class=" col-md-12"><form id="formPjEdit" onsubmit="return false" role="form" class="form-horizontal"><br>';
					datos += '<table class="table">';
					datos += '<tr><td colspan="5"><button type="button" class="libre">Cerrar</button></td></tr>';
					datos += '<tr><th>ID:</th><th>Nombre:</th><th>Nivel:</th><th>N.A:</th><th>Clase Armadura</th><th>Estilo</th></tr><tr><td>';
					datos += '<input type="text" class="form-control"  placeholder="Número de Pj" id="id_pj" name="id_pj" class="form-control" value="'+res.charac_id+'"></td><td>';
					datos += '<input type="text" class="form-control" id="nombre_pj" name="name_pj" class="form-control" value="'+res.nombre+'"></td><td>';
					datos += '<input type="text" class="form-control" id="nivel_pj" name="nivel_pj" class="form-control" value="'+res.nivel+'"></td><td>';
					datos += '<input type="text" class="form-control" id="n_a_pj" name="n_a_pj" class="form-control"  value="'+res.na+'"></td><td>';
					datos += '<input type="text" class="form-control" placeholder="10/20/50/100" id="clase_pj" name="clase_pj" class="form-control" value="'+res.clase+'"></td><td>';
					datos += '<input type="text" class="form-control" id="estilo_pj" name="estilo_pj" class="form-control"  value="'+res.estilo+'"></td>';
					datos += '</tr><tr><td colspan="5" class="centrado"><h4>Caracteristicas de Personaje</h2></td></tr>';
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
					datos += '<td><input type="text" class="form-control" id="oido_pj" value="'+res.sentidos.oido+'" name="oido_pj" class="form-control"></td></tr>';
					datos += '<tr class="centrado"><th>Intuición</th><th>7º Sentido</th><th>8º Sentido</th><th>Omega</th><th>10º Sentido</th></tr>';
					datos += '<tr><td><input type="text" class="form-control" id="intuicion_pj" value="'+res.sentidos.intuicion+'" name="intuicion_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="7_pj" name="7_pj" value="'+res.sentidos.septimo+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="8_pj" name="8_pj" value="'+res.sentidos.octavo+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="omega_pj" name="omega_pj" value="'+res.sentidos.omega+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="10_pj" name="10_pj" value="'+res.sentidos.decimo+'" class="form-control"></td></tr>';
					datos += '<tr><th colspan="5" class="centrado"><h4>Técnicas de Ataque</h4></th></tr>';
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
					datos += '<td><input type="text" class="form-control" id="antidaño_def'+defensas+'_pj" value="'+res.defensas[defensas].antidaño+'" class="form-control"></td>';
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
						datos +=  '<td colspan="2"><textarea rows="3" cols="10" class="form-control" id="descripcion_hab'+habilidad+'_pj" value="'+res.habilidades[habilidad].descripcion+'" class="form-control"></textarea></td></tr>';
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
					datos += '<td><input type="text" class="form-control" id="afbc_pj" value="'+res.bases.afbc+'" class="form-control"></td>';
					datos += '<td rowspan="6"><input type="text" class="form-control" value="'+res.bases.ba+'" id="ba_pj" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="afb_pj" value="'+res.bases.baf+'" class="form-control"></td></tr>';

					//
					//
					// <<<<<< DEFENSA FISICA >>>>>>
					//
					//


					datos += '<tr><th>D. Física</th>';
					datos += '<td><input type="text" class="form-control" id="dfbc_pj" value="'+res.bases.dfbc+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="dfb_pj"  value="'+res.bases.bdf+'"class="form-control"></td></tr>';

					//
					//
					// <<<<<< ATAQUE COSMICO >>>>>>
					//
					//


					datos += '<tr><th>A. Cosmico</th>';
					datos += '<td><input type="text" class="form-control" id="acbc_pj" value="'+res.bases.acbc+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="acb_pj" value="'+res.bases.bac+'" class="form-control"></td></tr>';

					//
					//
					// <<<<<< DEFENSA COSMICA >>>>>>
					//
					//


					datos += '<tr><th>D. Cosmica</th>';
					datos += '<td><input type="text" class="form-control" id="dcbc_pj" value="'+res.bases.dcbc+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="dcb_pj" value="'+res.bases.bdc+'" class="form-control"></td></tr>';

					//
					//
					// <<<<<< ATAQUE PSIQUICO >>>>>>
					//
					//


					datos += '<tr><th>A. Psiquico</th>';
					datos += '<td><input type="text" class="form-control" id="apbc_pj" value="'+res.bases.apbc+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="apb_pj" value="'+res.bases.bap+'" class="form-control"></td></tr>';

					//
					//
					// <<<<<< DEFENSA PSIQUICA >>>>>>
					//
					//


					datos += '<tr><th>D: Psiquica</th>';
					datos += '<td><input type="text" class="form-control" id="dpbc_pj" value="'+res.bases.dpbc+'" class="form-control"></td>';
					datos += '<td><input type="text" class="form-control" id="dpb_pj" value="'+res.bases.bdp+'" class="form-control"></td></tr>';

					datos +='</table><button type="button" id="enviarPJ" class="btn btn-primary" value="actualizar">Enviar Pj</button></form></div></div>';
					socket.emit('formPjEdit', datos);
				}
						} else{
							console.log(err);
							return next();
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
					datos = '<div id="panel_administracion"><button type="button" class="close"><span class="libre" aria-hidden="false">&times;</span><span class="sr-only">Close</span></button><h3>Panel de Administracion</h3>';
					datos +='<ul><li><div class="btn btn-primary btn-lg btn-block" id="nuevo_personaje">Añadir Personaje</div></li><li><div class="btn btn-primary btn-lg btn-block" id="editarPj">Editar Personaje</div></li>';
					datos +='<li><div class="btn btn-primary btn-lg btn-block">Eventos Web</div></li><li><div class="btn btn-primary btn-lg btn-block">Noticias</div></li>';
					datos +='<li><div class="btn btn-primary btn-lg btn-block">Moderar Batallas</div></li><li><div class="btn btn-primary btn-lg btn-block">Moderar Ranking</div></li></ul></div>';
					socket.emit('recibir_administracion', datos);
				});

				// Evento de socjets que permite al moderador
				// acceder al panel de moderación y poder moderar
				// a su antojo.
				//
				//

				socket.on('moderacion', function(){
					datos = '<div id="panel_administracion"><button type="button" class="close"><span class="libre" aria-hidden="false">&times;</span><span class="sr-only">Close</span></button><h3>Panel de Moderación</h3>';
					datos +='<ul><li><div class="btn btn-primary btn-lg btn-block">Noticias</div></li>';
					datos +='<li><div class="btn btn-primary btn-lg btn-block">Moderar Batallas</div></li><li><div class="btn btn-primary btn-lg btn-block">Moderar Ranking</div></li></ul></div>';
					socket.emit('recibir_moderacion', datos);
				});


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