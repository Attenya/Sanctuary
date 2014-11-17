
$("#chat_usuario").submit(function(event){
	var mensaje_completo = $('#m').val();
	if(mensaje_completo.indexOf('"') !== 0){
		socket.emit('msg', usuario.user_id, mensaje_completo);
	} else {
		var espacio = mensaje_completo.indexOf(" ");
		var id = mensaje_completo.substring(1, espacio);
		var mensaje = mensaje_completo.substring(espacio);
		$("#my_ul").append($('<li class="privado">').html("<span id='perfil2'>"+usuario.user_id+"</span>: "+mensaje));
		socket.emit('privado', mensaje, id, usuario.user_id);

	}	
	$("#m").val("");
});

$('#unirse').click(function(event){
	socket.emit('recargar');

});

$("#my_ul").on("click", "li", function(event){
$('#perfil , #panel_administracion, #panel_moderacion').remove();
perfil = $(this).children("span").text();
socket.emit('perfil', perfil);
});

$(".dropdown-menu").on("click", ".perfil", function(event){
$('#perfil, #panel_administracion, #panel_moderacion').remove();
perfil = usuario.user_id;
socket.emit('perfil', perfil);
});

$(".dropdown-menu").on("click", ".glyphicon-log-out", function(event){
perfil = usuario.user_id;
socket.emit('disconnect', perfil);
});

$('#estatico').on('click', "#nuevo_personaje", function(event){
$('#perfil, #panel_administracion, #panel_moderacion').remove();
socket.emit('nuevo_personaje');
})

$("#administracion").click(function(event){
	$('#perfil').remove();
	$('#noticias, #menu_batallas, #ranking').hide();
	socket.emit('administracion');
})

$("#moderacion").click(function(event){
	$('#perfil').remove();
	$('#noticias, #menu_batallas, #ranking').hide();
	socket.emit('moderacion');
})

$('#estatico').on('click', ".libre", function(event){
	$("#perfil, #panel_administracion, #panel_moderacion").remove();
	$("#perfil").remove();
	$("#noticias, #menu_batallas, #ranking").show();
})

var chatRoom = null;
var socket = io('http://localhost:3000/');
var total = 0;
var perfil = "";
var tabla = "";

socket.on("prv", function(data){
$('#my_ul').append($('<li class="privado">').html(data));
})

socket.on('conectados', function(data){
	if(data == null || data == undefined){
		$('#conectados ul').append($('<li class="peque">').text("No hay usuarios conectados"));
	}else {
		$('#conectados ul li').remove();
		$.each(data, function(orden, elemento){
			$('#conectados ul').append($("<li class='"+elemento.bando+"'>").text(elemento.user_id));
		});
		
	};
})
socket.on('recibir_editar_personaje', function(charac){
	$('#perfil, #panel_moderacion, #panel_administracion').remove();
	total = 0;
	if(charac.charac_id === null || charac.charac_id === undefined){
		tabla = '<div id="perfil"><button type="button" class="close"><span class="libre" aria-hidden="false">&times;</span><span class="sr-only">Close</span></button>'
		tabla +='<div class="col-sm-12"><h2>Lista de Personajes</h2><table class="table table-hover">';
		tabla +='<thead><tr><th>#</th><th>Nombre</th><th>Activo</th><th>Estado</th></tr></thead><tbody>';
		tabla +='<tr><td>#</td><td>----</td><td>----</td><td>----</td></tr>';
		tabla +='</tbody></table></div> <div class="col-sm-12"><button type="button" class="btn btn-primary" id="nuevo_personaje">Añadir Personaje</button></div></br></div>'
		$('#estatico').append(tabla);

	} else {
		tabla = '<div id="perfil"><button type="button" class="close"><span class="libre" aria-hidden="false">&times;</span><span class="sr-only">Close</span></button>'
		tabla +='<div class="col-sm-12"><h2>Lista de Personajes</h2><table class="table table-hover">';
		tabla +='<thead><tr><th>#</th><th>Nombre</th><th>Activo</th><th>Estado</th></tr></thead><tbody><tr>';
		$.each(charac, function(indice, persn){
			total++;
			if(persn.activo === true){
				if(persn.estado === "Dañado"){
					tabla +='<tr class="warning"><td>'+cuenta+'</td><td>'+persn.nombre+'</td><td>'+persn.activo+'</td><td>'+persn.estado+'</td></tr>';
				}else {
					if(persn.estado === "Destruido"){
						tabla +='<tr class="danger"><td>'+cuenta+'</td><td>'+persn.nombre+'</td><td>'+persn.activo+'</td><td>'+persn.estado+'</td></tr>';
					}else  {
						tabla +='<tr class="success"><td>'+cuenta+'</td><td>'+persn.nombre+'</td><td>'+persn.activo+'</td><td>'+persn.estado+'</td></tr>';
					}
				}
			} else {
				tabla +='<tr><td>'+cuenta+'</td><td>'+persn.nombre+'</td><td>'+persn.activo+'</td><td>'+persn.estado+'</td></tr>';
			}
	});

	}
	tabla += '</tbody></table></div></div>';
	$('#estatico').append(tabla);
});

socket.on('recibir_nuevo_personaje', function(data){
		$('#estatico').append(data);
})

socket.on('recibir_administracion', function(data){
$('#estatico').append(data);
})

socket.on('recibir_moderacion', function(data){
$('#estatico').append(data);
})


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
 $('#my_ul').append($('<li>').html("<span id='perfil2'>"+mensaje.emisor+"</span>: "+mensaje.mensaje));
	});
});


 socket.on('chat', function(msg){
 $('#my_ul').append($('<li>').html(msg));
 })

 socket.on("dsc", function(msg){
 	 $('#mensajes_chat').append($('<li>').text(msg));
 })

 socket.on("unir", function(msg){
 	$('#mensajes_sistema').append($('<li>').text(msg));
 })

socket.on('perfil', function(data){
$('#noticias, #menu_batallas, #ranking').hide();
$(' #perfil, #panel_administracion, #panel_moderacion').remove();
$('#estatico').append(data);
var personaje = "<div class='nombre'>"+DataCharacters[data][nombre]+"</div>"
$('.personajes').append(personaje);
});

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
