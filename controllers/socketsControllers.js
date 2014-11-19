var socket = require('socket.io');

var	usuarios = new Array();


var DB = require('../models/chatModels');
var User = require('../models/users');

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
							datos = '<div id="perfil"><button type="button" class="close"><span class="libre" aria-hidden="false">&times;</span><span class="sr-only">Close</span></button>';
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
					datos = '<div id="perfil"><button type="button" class="close"><span class="libre" aria-hidden="false">&times;</span><span class="sr-only">Close</span></button>';
					datos +='<div class=" col-md-12"><form id="formPjNew" method="" role="form" class="form-horizontal"><br><div class="form-group"><label for="id_pj" class="col-sm-1 control-label">ID:</label>';
					datos +='<div class="col-sm-2"><input type="text" id="id_pj" name="id_pj" class="form-control"></div>';
					datos +='<label for="name_pj" class="col-sm-1 control-label">Nombre:</label><div class="col-sm-2"><input type="text" id="name_pj" name="name_pj" class="form-control">';
					datos +='</div><label for="nivel_pj" class="col-sm-1 control-label">Nivel:</label><div class="col-sm-2">';
					datos +='<input type="text" id="nivel_pj" name="nivel_pj" class="form-control"></div>';
					datos +='<label for="n_a_pj" class="col-sm-1 control-label">N.A:</label><div class="col-sm-2"><input type="text" id="n_a_pj" name="n_a_pj" class="form-control">';
					datos +='</div></div></form></div></div>';
					socket.emit('recibir_nuevo_personaje', datos);
				});

				// Evento de sockets que permite al administrador 
				// acceder al panel de administración y poder hacer
				// y deshacer a su antojo
				//
				//

				socket.on('administracion', function(){
					datos = '<div id="panel_administracion"><button type="button" class="close"><span class="libre" aria-hidden="false">&times;</span><span class="sr-only">Close</span></button><h3>Panel de Administracion</h3>';
					datos +='<ul><li><div class="btn btn-primary btn-lg btn-block" id="nuevo_personaje">Añadir Personaje</div></li><li><div class="btn btn-primary btn-lg btn-block">Editar Personaje</div></li>';
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