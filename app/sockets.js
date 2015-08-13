
var User = require('../models/users');
var Mensaje = require ('../models/chat');
var Personaje = require ('../models/characters');
var datos = "";
var fs = require('fs');

module.exports = function(server){
var io = require('socket.io').listen(server);
/*Comienza el proceso de conexión de sockets*/
io.on('connection', function(socket){
console.log("Un nuevo usuario conectado");
/*Se envia un mensaje al chat y se guarda en el log de chats*/
 socket.on('chat', function(msg){
 	var newMsg = new Mensaje();
 	newMsg.texto = msg;
 	newMsg.chat_id = 1;
 	newMsg.save(function(err){
 		if(err)
 			throw err
 	});
    console.log("mensaje: "+ msg);
    io.emit('chat', msg);
 });

 /*Funcion que recarga los 10 ultimos mensajes en la base de datos*/
socket.on('recargar', function(){
	Mensaje.find({}, null, {limit: 10, sort: {realizado: 1}}, function(err, msg) {
		socket.emit('recarga', msg);
	});
});

/*Funcion que permite chatear a un usuario y que además actualiza su estado en el chat*/
socket.on('conectar', function(data){
User.findOne({user_id: data}, function(err, user){
	if(err)
		throw err
	user.chat = true;
	user.save();
});
});

/*Funcion que desconecta al usuario del chat y actualiza su estado en el mismo*/
socket.on('disconnect', function(data){
	User.findOne({user_id: data}, function(err, user){
		if(err){return next()};
		if(user){
			user.chat = false;
			user.save(function(err){
				if(err){return next()};
			})
		}
	})
})

socket.on('desconectar', function(data){
	User.findOne({user_id: data}, function(err, user){
		if(err){return next()};
		if(user){
			user.chat = false;
			user.save(function(err){
				if(err){return next()};
			})
		}
	})
})

/*Funcion del socket que controla el envio de perfil*/
socket.on('perfil', function(data){
User.findOne({user_id: data}, function(err, user){
if(err){
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

/*Evento de Socket Que controla la creacion e inserción de nuevos personajes*/
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
})

/*Evento de Soccket que controla la edicion de personajes*/
socket.on('editar_personaje', function(){
Personaje.find({}, function(err, charac){
if(err){
	return next();
}

if(charac){
	socket.emit('recibir_editar_personaje', charac)
} else {
	datos = "";
	socke.emit('recibir_aeditar_personaje', datos);
}
})

});

/*Evento de socket que muestra la pantalla de Administración*/
socket.on('administracion', function(){
	datos = '<div id="panel_administracion"><button type="button" class="close"><span class="libre" aria-hidden="false">&times;</span><span class="sr-only">Close</span></button><h3>Panel de Administracion</h3>';
	datos +='<ul><li><div class="btn btn-primary btn-lg btn-block" id="nuevo_personaje">Añadir Personaje</div></li><li><div class="btn btn-primary btn-lg btn-block">Editar Personaje</div></li>';
	datos +='<li><div class="btn btn-primary btn-lg btn-block">Eventos Web</div></li><li><div class="btn btn-primary btn-lg btn-block">Noticias</div></li>';
	datos +='<li><div class="btn btn-primary btn-lg btn-block">Moderar Batallas</div></li><li><div class="btn btn-primary btn-lg btn-block">Moderar Ranking</div></li></ul></div>';
	socket.emit('recibir_administracion', datos);
});

socket.on('moderacion', function(){
	datos = '<div id="panel_administracion"><button type="button" class="close"><span class="libre" aria-hidden="false">&times;</span><span class="sr-only">Close</span></button><h3>Panel de Moderación</h3>';
	datos +='<ul><li><div class="btn btn-primary btn-lg btn-block">Noticias</div></li>';
	datos +='<li><div class="btn btn-primary btn-lg btn-block">Moderar Batallas</div></li><li><div class="btn btn-primary btn-lg btn-block">Moderar Ranking</div></li></ul></div>';
	socket.emit('recibir_moderacion', datos);
});
//
})

//Fin del Script
}