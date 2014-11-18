var socket = require('socket.io');

var	usuarios = new Array();


var DB = require('../models/chatModels');

var socketsControllers = function(app){
	var io = socket.listen(app);

		io.on('connection', function(socket){
			console.log("pepito");
				socket.on('conectar', function(data, bando){
					socket.usuario = data;
					if(socket.usuario == null || socket.usuario == undefined){
						DB.recargar(function(err, res){
							if(!err){
								var recibido = res;
								ordenado = recibido.slice(0);
								ordenado.sort(function(a, b) {return a.fecha - b.fecha});
								socket.emit('recargar', ordenado);
								DB.conectados(function(err,res){
									if(!err){
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
						DB.conectar(socket.usuario, function(err){
							if(err){
								console.log(err);
										return next();
							} 
						});
						usuarios[socket.usuario] = {usuario: socket.usuario, puerto: socket.id, bando: bando};
						DB.recargar(function(err, res){
							if(!err){
								var recibido = {};
								for(i=9, f=0; i>-1; i--){
									recibido[f] = res[i];
									f++;
								}

								socket.emit('recargar', recibido);
							} else {
								console.log(err);
							};
						
						});

						DB.conectados(function(err,res){
							if(!err){
								io.emit('conectados', res);
							} else {
								console.log(err);
										return next();
							};
						});


					}

				});

				socket.on('msg', function(usuario, mensaje){
					DB.general(usuario, mensaje, function(err, res){
						if(err){
							console.log(err);
										return next();
						};
						
					});
					enviarGeneral(usuario, mensaje);
				});

				socket.on('disconnect', function(){
					if(socket.usuario ){
						DB.desconectar(socket.usuario, function(err,res){
							if(err){
								console.log(err);
							}
						});
						DB.conectados(function(err,res){
									if(!err){
										io.emit('conectados', res);
									} else {
										console.log(err);
										return next();
									};
								});
						
						delete usuarios[socket.usuario];
					}
					

				});

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

		var enviarMensaje = function (mensaje, receptor, emisor) {
					var envio = "<span id='perfil2'>>>"+emisor+ "</span>: " + mensaje;
					io.to(usuarios[receptor].puerto).emit('prv', envio);
					console.log(emisor+": "+mensaje);

		};

		var enviarGeneral = function(emisor, mensaje){
					var envio = "<span id='perfil2'>"+emisor+"</span>: "+mensaje;
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