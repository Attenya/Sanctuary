
var chatRoom = null;
var socket = io.connect();
var total = 0;
var perfil = "";
var tabla = "";
var pj = new Object();

// Funcion Usuario Privado:
//		Permite al usuario enviar el mensaje del chat
//		Diferenciando entre mensaje privado y general.
//

$(document).ready(function () {
$("#chat_usuario").submit(function(event){
	var mensaje_completo = $('#m').val();
	var bando = usuario.bando.split(" ");
	var id_bando = bando.join("_");
	if(mensaje_completo.indexOf('"') != 0){
		if(mensaje_completo.indexOf("/") == 0){
			var barra = mensaje_completo.indexOf("/");
			var mensaje = mensaje_completo.substring(1);
			socket.emit('msjGeneral1', usuario.user_id, mensaje, id_bando)
		} else {
			if(mensaje_completo.length < 1){

			} else {
				socket.emit('msg', usuario.user_id, id_bando, mensaje_completo);
				var d = $('.cuerpoChat1');
				var height = d[0].scrollHeight;
				d.scrollTop(height);
			}
		}
	} else {
			var espacio = mensaje_completo.indexOf(" ");
			var id = mensaje_completo.substring(1, espacio);
			var mensaje = mensaje_completo.substring(espacio);
			$("#my_ul").append($('<li class="privado">').html("<span id='perfil2'>"+usuario.user_id+"</span>: "+mensaje));
			socket.emit('privado', mensaje, id, usuario.user_id);
	}	
	$("#m").val("");
});

// Funcion Usuario Privada:
//		Permite al usuario colocar lo preciso
//		para enviar un mensaje privado haciendo click
//		sobre el usuario de la lista de conectados

$("#ulConectados").on("click", "li", function(event){
	if(usuario.user_id != null || usuario.user_id != undefined){
		var id = $(this).text();
		$("#m").val("\""+id+" ");
	};
});

// Funcion Publica:
//	Permite ver el perfil de un usuario del chat
//
//

$("#my_ul").on("click", "li", function(event){
$('.Vperfil , #panel_administracion, .tabMod, #battle, .notCompleta').remove();
perfil = $(this).children("span").text();
socket.emit('perfil', perfil);
});

socket.on('perfil', function(data, template){
$('.Vperfil, #panel_administracion, .tabMod, .tablon').remove();
var f1 = new Date(data.created_at);
var dia = f1.getDate();
var mes = f1.getMonth()+1;
var ano = f1.getFullYear();
var f2 = dia+"/"+mes+"/"+ano;
var us = new Object();
us = data;
us['fecha'] = f2;
console.log(f2);
console.log(us.fecha);
var plantilla = Handlebars.compile(template);
var html = plantilla(us);
$('#estatico').append(html);
$(".fecha_completa").append(fecha);

});

// Funcion Usuario Privada:
//	Permite veer el perfil personal del usuario
//
//


$(".dropdown-menu").on("click", ".perfil", function(event){
$('.Vperfil, #panel_administracion, .tabMod, #battle, .notCompleta').remove();
perfil = usuario.user_id;
socket.emit('perfil', perfil);
});

// Funcion Simple:
//	Desconecta al usuario de la cuenta actual
//
//

$(".dropdown-menu").on("click", ".glyphicon-log-out", function(event){
perfil = usuario.user_id;
socket.emit('disconnect', perfil);
});

// Funcion General:
//		Permite a todo usuario cerrar la ventana que
//		tiene abierta actualmente.
//

$('#estatico').on('click', ".libre", function(event){
	$(".Vperfil, #panel_administracion, .tabMod, #battle, .notCompleta, .tabNoticias, .tabBatallas, .tabEventosYTorneos").remove();
	history.pushState('', 'New Url: '+"Inicio", "/");
	event.preventDefault();
	socket.emit("tablon");
})

socket.on("prv", function(data){
$('#my_ul').append($('<li class="privado">').html(data));
$("#mensajes_chat").animate({ scrollTop: $('#mensajes_chat')[0].scrollHeight}, 1000);

})

socket.on('conectados', function(data){
	if(data == null || data == undefined){
		$('#conectados ul').append($('<li class="peque">').text("No hay usuarios conectados"));
	}else {
		$('#conectados ul li').remove();
		$.each(data, function(orden, elemento){
			var bando = elemento["bando"].split(" ");
			var id_bando = bando.join("_");
			$('#conectados ul').append($("<li class='"+id_bando+"'>").text(elemento.user_id));
		});
		
	};
})


//
//	/*Funciones Socket.IO Destinadas a la Moderación - SuperModeracion - Administración*/
//
//
//

$("#moderacion").click(function(event){
	$('.Vperfil, #battle, .notCompleta, .tablon').remove();
	socket.emit('Portal');
	history.pushState('', 'New Url: '+"Moderación", "/moderacion");
	event.preventDefault();
})

$("#Smoderacion").click(function(event){
	$('.Vperfil, #battle, .notCompleta, .tablon').remove();
	socket.emit('SPortal');
	history.pushState('', 'New Url: '+"Moderación", "/Smoderacion");
	event.preventDefault();
})

//
//
//		/*Apartado Portal*/
//
//

$("#moderacion").click(function(event){
	$('.Vperfil, #battle, .notCompleta, .tablon').remove();
	socket.emit('Portal');
	history.pushState('', 'New Url: '+"Moderación", "/moderacion");
	event.preventDefault();
})
//
//
//	/*Apartado Menu Moderación - SuperModeración - Administracion*/
//
//


$('#estatico').on("click", "#mod", function(event){
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	var menu = $(this).text();
	socket.emit(menu);
})

$('#estatico').on("click", "#Sportal", function(event){
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	var menu = $(this).text();
	socket.emit("SPortal");
})

socket.on("portal", function(users, template, pjs, noticias){
$(".tabMod, .tablon").remove()
var usuarios_totales = 0;
for(var i=0; i < users.length; i++ ){
	usuarios_totales++;

}
var plantilla = Handlebars.compile(template);
var html = plantilla(users);
$("#estatico").append(html);
$(".EstUsers").append(usuarios_totales);
$(".EstPjs").append(pjs);
$("#mod:first").addClass("active");
var not = "";
for(var i = 0; i<noticias.length; i++){
	not += "<div class='col-md-12 col-xs-12'><div class='col-md-2 col-xs-3'>"+noticias[i].fecha+"</div><div class='col-md-10 col-xs-9'>";
	not += "<a href='Noticias/id/"+noticias[i]['id']+"'>"+noticias[i].titulo+"</a></div></div>";
}

$(".tabNotSimple").append(not);
});

socket.on("Sportal", function(users, template, pjs, noticias){
$(".tabMod, .tablon").remove()
var usuarios_totales = 0;
for(var i=0; i < users.length; i++ ){
	usuarios_totales++;

}
var plantilla = Handlebars.compile(template);
var html = plantilla(users);
$("#estatico").append(html);
$(".EstUsers").append(usuarios_totales);
$(".EstPjs").append(pjs);
$("#Sportal").addClass("active");
var not = "";
for(var i = 0; i<noticias.length; i++){
	not += "<div class='col-md-12 col-xs-12'><div class='col-md-2 col-xs-3'>"+noticias[i].fecha+"</div><div class='col-md-10 col-xs-9'>";
	not += "<a href='Noticias/id/"+noticias[i]['id']+"'>"+noticias[i].titulo+"</a></div></div>";
}

$(".tabNotSimple").append(not);
});

//
//	/*Apartado - Noticias*/
//
//
//

socket.on("Noticias", function(noticias, template){
$(".tabPortal, .tabNoticias, .tablon, .tabUsuarios, .tabBatallas, .tabEventosYTorneos").remove();
var plantilla = Handlebars.compile(template);
var html = plantilla(noticias);
$(".tabModFijo").append(html);
whizzywig()
});

$("#estatico").on("click", ".leerNoticia", function(event){
	var divPadre = $(this).closest("div");
	var hermanos = divPadre.siblings("div");
	var divId = hermanos[0]['innerText'];
	socket.emit("buscarNoticia", divId);
})


socket.on("prev", function(noticia, template, user){
	$(".notCompleta").remove();
	var plantilla = Handlebars.compile(template, {noEscape: true});
	var html = plantilla(noticia);
	$(".bs-example-modal-lg .modal-content").append(html);
	if(user[0].avatar == null || user[0].avatar == undefined || user[0].avatar == ""){
		$(".notAutorAvatar").append("<img src='/images/avatar.png' class='img-responsive'>");
	}else{
		$(".notAutorAvatar").append(user[0].avatar);
 		$(".notAutorAvatar img").addClass("img-responsive");
	}
})

$("#estatico").on("click", ".borrarNoticia", function(event){
	var divPadre = $(this).closest("div");
	var hermanos = divPadre.siblings("div");
	var divId = hermanos[0]['innerText'];
	socket.emit("borrarNoticia", divId);
	socket.emit("Noticias");
})

$("#estatico").on("click", "#guardar", function(event){
	var noticia = new Object();
	noticia['id'] = $("#id").val();
	noticia.url = $("#url").val() || "";
	noticia.titulo = $("#titulo").val();
	syncTextarea()
	noticia.desc1 = $("#desc1").val();
	syncTextarea()
	noticia.desc2 = $("#desc2").val();
	noticia.temas = new Object ();
	$('input[name="chk[]"]:checked').each(function() {
		//$(this).val() es el valor del checkbox correspondiente
		noticia.temas[$(this).val()] = "Si";
	});
	noticia.calificacion = new Object();
	$('input[name="chk2[]"]:checked').each(function(){
		noticia.calificacion[$(this).val()] = "Si";
	});
	noticia.autor = usuario.user_id;
	noticia.imagen = $("#imagen").val();
	socket.emit("noticiaNueva", noticia);
	socket.emit("Noticias");

})

$("#estatico").on("click", "#previsualizar", function(event){
$(".descCompleta, .tituloPrev, .autorPrev, .fechaPrev, .temasPrev, .notAutorAvatar").empty();
 $(".tituloPrev").append($("#titulo").val());
 $(".autorPrev").append(usuario.user_id);
 $(".imagenPrev img").addClass("img-responsive");
 if($("#imagen").val() != null || $("#imagen").val() != undefined || $("#imagen").val() != ""){
 	$(".imagenPrev").append("<img src='"+$("#imagen").val()+"' class='img-responsive'>");
 }
 if(usuario.avatar == null || usuario.avatar == undefined || usuario.avatar == ""){
 	 	console.log("No tiene avatar")
 	$(".notAutorAvatar").append("<img src='/images/avatar.png' class='img-responsive'>");
 } else {
 	$(".notAutorAvatar").append(usuario.avatar);
 	$(".notAutorAvatar img").addClass("img-responsive");
 	console.log("Tiene avatar");
 }
 syncTextarea()
 $(".descCompleta").append($("#desc2").val());
 var fecha = new Date();
 var dia = fecha.getDate();
 var mes = fecha.getMonth();
 var ano = fecha.getFullYear();
 var f2 = dia+"/"+mes+"/"+ano;
 $(".fechaPrev").append(f2);
 $('input[name="chk[]"]:checked').each(function() {
		//$(this).val() es el valor del checkbox correspondiente
		$(".temasPrev").append($(this).val().capitalize()+"</br>");
	});
})

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


//
//
// /* Apartado - Usuarios*/
//
//
socket.on("listaUsuarios", function(users, template){
	$(".tabPortal, .tabNoticias, .tablon, .tabNoticias, .tabUsuarios, .tabBatallas, .tabEventosYTorneos").remove();
	var plantilla = Handlebars.compile(template);
	var html = plantilla(users);
	$(".tabModFijo").append(html);

})

$("#estatico").on("click", "#buscarUsuario", function(event){
		var id_usuario = $("#usuario").val();
		socket.emit("buscarUsuario", id_usuario, "busqueda");
})

socket.on("usuarioEncontrado", function(user, template, funcion){

	Handlebars.registerHelper("chkb", function(objeto, valor, options){
		if(objeto == valor){
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});

	$(".tabUsForm").empty();

	if(funcion == "busqueda"){
		$(".tabUsList2").empty();
		var html = '<div class="col-md-12 col-xs-12 tabUsUsuario"><div class="col-md-1 col-xs-1">ID:</div><div class="col-md-8 col-xs-5">'+user[0].user_id+'</div><div class="col-md-1 col-xs-2">';
		html +='<button type="button" id="editarUsuario" class="btn btn-xs btn-info">Editar</button></div><div class="col-md-1 col-xs-2"><button type="button" id="borrarUsuario" class="btn btn-xs btn-danger">Borrar</button>';
		html +='</div><div class="col-md-1 col-xs-2"><button type="button" id="banearUsuario" class="btn btn-xs btn-warning">Buscar</button></div></div>';
		$(".tabUsList2").append(html)
	} else {
		var plantilla = Handlebars.compile(template);
		var html = plantilla(user);
		$(".tabUsForm").append(html);
		socket.emit("userPJ", user[0].user_id)
	}
	
});

socket.on("userPJ", function(personajes, cantidad){
	if(cantidad >= 1){
		console.log("Hay pjs en la base de datos")
		var divH = '<div class="col-md-4 col-xs-12"><div class="col-md-10 col-xs-10"><select class="form-control">';
		divH += '<option>Una opcion cualquiera</option></select></div><div class="col-md-1 col-xs-2 col-md-offset-1">';
		divH += '<button type="button" class="btn btn-xs btn-default" >+</button></div></div>';
	} else {
		$(".pjsUsuario").append("<div class='avisoCentrado'>No hay personajes en la Base de Datos. ¡Avisa al Administrador para que haga su trabajo!</div>");
	}
})

$("#estatico").on("click", "#editarUsuario", function(event){
		var divPadre = $(this).closest("div");
		var hermanos = divPadre.siblings("div");
		var divId = hermanos[1]['innerText'];
		socket.emit("buscarUsuario", divId, "edicion");
})

$("#estatico").on("click", "#guardarEdit", function(event){
	var us = new Object();
	us['user_id'] = $("#user_id").val();
	us.avatar = $("#avatar").val();
	us.mail = $("#mail").val();
	us.bando = $("#bando option:selected").val();
	us.range = $("#range option:selected").val();
	us.badges = $("#badges").val();
	socket.emit("editarUsuario", us);
});

$("#estatico").on("click", "#borrarUsuario", function(event){
	var divPadre = $(this).closest("div");
		var hermanos = divPadre.siblings("div");
		var divId = hermanos[1]['innerText'];
		socket.emit("borrarUsuario", divId);
})

socket.on("err", function(tipo){
	if(tipo == "borrarStaff"){
		$(".textoFlotanteTxt").empty();
		$(".textoFlotanteTxt").append("No se puede borrar este usuario por ser miembro del Staff. Sólo el administrador tiene privilegios para ello");
		$(".textoFlotante").show();

	}
});

$(".error").on("click", function(event){
	$(".textoFlotante").hide();
})



//
//
//	/* Apartado - Batallas */
//
//

socket.on("batMod", function(bat, template){
		$(".tabPortal, .tabNoticias, .tablon, .tabNoticias, .tabUsuarios, .tabBatallas, .tabEventosYTorneos").remove();
	var plantilla = Handlebars.compile(template);
	var html = plantilla(bat);
	$(".tabModFijo").append(html);

})


//
//
//	/* Apartado - Eventos y Torneos */
//
//

socket.on("Eventos y Torneos", function(eventos, template){
	$(".tabPortal, .tabNoticias, .tablon, .tabNoticias, .tabUsuarios, .tabBatallas, .tabEventosYTorneos").remove();
	var plantilla = Handlebars.compile(template);
	var html = plantilla(eventos);
	$(".tabModFijo").append(html);
	whizzywig()
})









socket.on('listaPj', function(charac){
	$('.Vperfil, #panel_moderacion, #panel_administracion').remove();
	total = 0;
	if(charac == null){
		tabla = '<div id="perfil"><button type="button" class="libre">Cerrar</button>'
		tabla +='<div class="col-sm-12"><h2>Lista de Personajes</h2><table class="table table-hover">';
		tabla +='<thead><tr><th>#</th><th>Nombre</th><th>Activo</th><th>Estado</th></tr></thead><tbody>';
		tabla +='<tr><td>#</td><td>----</td><td>----</td><td>----</td></tr>';
		tabla +='</tbody></table></div> <div class="col-sm-12"><button type="button" class="btn btn-primary" id="nuevo_personaje">Añadir Personaje</button></div></br></div>'
		$('#estatico').append(tabla);

	} else {
		tabla = '<div id="perfil"><button type="button" class="libre">Cerrar</button>'
		tabla +='<div class="col-sm-12"><h2>Lista de Personajes</h2><table id="listado" class="table centrado">';
		tabla +='<thead><tr><th class="centrado">#</th><th class="centrado">Nombre</th><th class="centrado">Activo</th><th class="centrado">Estado</th><th></th><th></th></tr></thead><tbody><tr>';
		$.each(charac, function(indice, persn){
			if(persn.activo === true){
				if(persn.estado === "Dañado"){
					tabla +='<tr class="warning"><td>'+persn.charac_id+'</td><td>'+persn.nombre+'</td><td>'+persn.activo+'</td><td>'+persn.estado+'</td>';
					tabla += '<td><button type="button" id="editPj2"  class="btn btn-primary btn-xs" >Editar</button></td>';
					tabla +='<td><button type="button" id="eliminarPj" class="btn btn-primary btn-xs">Eliminar</button></td></tr>';
				}else {
					if(persn.estado === "Destruido"){
						tabla +='<tr class="danger"><td>'+persn.charac_id+'</td><td>'+persn.nombre+'</td><td>'+persn.activo+'</td><td>'+persn.estado+'</td>';
						tabla +='<td><button type="button" id="editPj2"  class="btn btn-primary btn-xs">Editar</button></td>';
						tabla +='<td><button type="button" id="eliminarPj" class="btn btn-primary btn-xs">Eliminar</button></td></tr>';
					}else  {
						tabla +='<tr class="success"><td>'+persn.charac_id+'</td><td>'+persn.nombre+'</td><td>'+persn.activo+'</td><td>'+persn.estado+'</td>';
						tabla +='<td><button type="button" id="editPj2" class="btn btn-primary btn-xs">Editar</button></td>';
						tabla +='<td><button type="button" id="eliminarPj" class="btn btn-primary btn-xs">Eliminar</button></td></tr>';
					}
				}
			} else {
				tabla +='<tr><td>'+persn.charac_id+'</td><td>'+persn.nombre+'</td><td>'+persn.activo+'</td><td>'+persn.estado+'</td>';
				tabla +='<td><button type="button" id="editPj2"  class="btn btn-primary btn-xs" >Editar</button></td>';
				tabla +='<td><button type="button" id="eliminarPj" class="btn btn-primary btn-xs">Eliminar</button></td></tr>';
			}
	});

	}
	tabla += '</tbody></table></div></div>';
	$('#estatico').append(tabla);
});




socket.on("connect", function(){
if(usuario == null){
var datos = usuario;
socket.emit('conectar', datos);
} else {
var datos = usuario.user_id;
var bando = usuario.bando;
socket.emit('conectar', datos, bando);
}
});


socket.on('recargar', function(msg){
	$.each(msg, function(indice, mensaje){

 $('#my_ul').append($('<li>').html("<span id='perfil2' class='"+mensaje.bando+"''>"+mensaje.emisor+"</span>: "+mensaje.mensaje));
	});

});


 socket.on('chat', function(msg){
 $('#my_ul').append($('<li>').html(msg));
 var d = $('.cuerpoChat1');
var height = d[0].scrollHeight;
d.scrollTop(height);
 })


socket.on('errorPrivado', function(data){
	var error = "El usuario "+data+" no se encuentra conectado";
	$('#my_ul').append($('<li class="alerta">').text(error));
})





socket.on("Bien", function(evento){
	if(evento == "Noticias"){
			socket.emit("Noticias");
	}

})




socket.on("tablonCompleto", function(noticias, template){
	Handlebars.registerHelper('if2', function(a, options){
	if(a== null || a == undefined || a == ""){
		 return options.fn(this);
	} else {
		 return options.inverse(this);
	}
});
	console.log(template);
	var plantilla = Handlebars.compile(template);
	var html = plantilla(noticias);
	$("#estatico").append(html);
})

socket.on("msjGeneral1", function(mensaje){
	$("#msjGenerales").append(mensaje);
})



var unirseRoom = function(room){
$('#mensajes_sistema').append($("<li>").text("Te has unido al chat "+room));
chatRoom = room; 
$('#mensajes_chat').append($("<li>").text("Te has unido al chat "+chatRoom));
socket.emit("unir", room);
$('#unirse, #enviar').remove();
$('#botones2').append($("<button onclick='this.form.envio()' id='enviar_room'>Enviar</button>"));
$("#boton2").append($("<button id='room' onclick='this.form.envio()' id='enviar_room'>"+room+"</button>"));
$("#boton3").append($("<button id='salir' onclick='salirRoom()' id='salir_room'>Salir</button>"));


 }

var salirRoom = function(room){
 $('#mensajes_sistema').append($("<li>").text("Has salido del chatroom "));
socket.emit("dscroom", room);
$("#room, #salir, #enviar_room").remove();
$("#boton2").append($("<button id='unirse' onclick='unirseRoom(\"room1\")'>Unirse</button>"));
$("#botones2").append($("<button onclick='this.form.envio()' id='enviar'> Enviar</button>"));
chatRoom = null;
 }
});

$("#estatico #probando a").on("click", function(e){
	var href = $(this).attr("href");
	history.pushState('', 'New Url: '+href, href);
	e.preventDefault();

})


