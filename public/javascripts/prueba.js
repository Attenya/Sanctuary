$(document).ready(function () {
$("#chat_usuario").submit(function(event){
	var mensaje_completo = $('#m').val();
	if(mensaje_completo.indexOf('"') !== 0){
		socket.emit('msg', usuario.user_id, usuario.bando, mensaje_completo);
	} else {
		var espacio = mensaje_completo.indexOf(" ");
		var id = mensaje_completo.substring(1, espacio);
		var mensaje = mensaje_completo.substring(espacio);
		$("#my_ul").append($('<li class="privado">').html("<span id='perfil2'>"+usuario.user_id+"</span>: "+mensaje));
		socket.emit('privado', mensaje, id, usuario.user_id);

	}	
	$("#m").val("");
});


$('#estatico').on("click", "#enviarPJ", function(event){
var fallo =  false;
var pj = new Object();
var total = 1;
var valor = $(this).attr('value');

	//
	// Se definen las variables del objeto
	// que forman las prinicpales caracteristicas
	// del personaje
	// Nombre, id, nivel, na, clase y estilo

	pj.charac_id = $("#id_pj").val();
	pj.nombre = $("#nombre_pj").val();
	pj.nivel = $("#nivel_pj").val();
	pj.na = $("#n_a_pj").val();
	pj.clase = $("#clase_pj").val();
	pj.estilo = $("#estilo_pj").val();

	//
	// Se definen las variables del objeto
	// que forman los atributos principales
	// del personaje
	// Pv, bonus pv, cosmos, cp, pva, bonus pva

	pj.atributos = new Object();
	pj.atributos.pv = $("#pv_pj").val();
	pj.atributos.bonuspv = $("#bonuspv_pj").val();
	pj.atributos.cosmos = $("#pc_pj").val();
	pj.atributos.bonusApc = $("#bonusApc_pj").val();
	pj.atributos.bonuspc = $("#bonuspc_pj").val();
	pj.atributos.cp = $("#cp_pj").val();
	pj.atributos.pva = $("#pva_pj").val();
	pj.atributos.bonuspva = $("#bonuspva_pj").val();

	//
	// Se definen las variables del objeto
	// que forman los sentidos del personaje
	// Vista, gusto, tacto, oido, olfato, intuicion,
	// septimo, octavo, omega y decimo.

	pj.sentidos = new Object();
	pj.sentidos.tacto = $("#tacto_pj").val();
	pj.sentidos.vista = $("#vista_pj").val();
	pj.sentidos.olfato = $("#olfato_pj").val();
	pj.sentidos.oido = $("#oido_pj").val();
	pj.sentidos.gusto = $("#gusto_pj").val();
	pj.sentidos.intuicion = $("#intuicion_pj").val();
	pj.sentidos.septimo = $("#7_pj").val();
	pj.sentidos.octavo = $("#8_pj").val();
	pj.sentidos.omega = $("#omega_pj").val();
	pj.sentidos.decimo = $("#10_pj").val();

//
// Loop For() que extrae los valores de cada ataque
// tanto su daño, como su nombre, tipo, especiales,
// bonus y gastos.
//

pj.ataque= new Object();
for(var i=1; i<11; i++){
		if($("#nm_atk"+i+"_pj").val() == undefined){
	fallo = true;
	} else {
	pj.ataque[i] = new Object();
	pj.ataque[i].nombre = $("#nm_atk"+i+"_pj").val();
	pj.ataque[i].tipo = $("#tipo_atk"+i+"_pj").val();
	pj.ataque[i].especial = $("#especial_atk"+i+"_pj").val();
	pj.ataque[i].gasto = $("#gasto_atk"+i+"_pj").val();
	pj.ataque[i].daño = $("#daño_atk"+i+"_pj").val();
	pj.ataque[i].bonus = $("#bonus_atk"+i+"_pj").val();
}
};

//
// Loop For() que extrae del formulario los datos de 
// de cada defensa, tanto su dalño como su nombre, tipo,
// especiales, bonus y gasto. Además avisa de si un dato
// esta vacio.

pj.defensa= new Object();
var x = 1;
for(var i=0; i<10; i++){
	pj.defensa[x] = new Object();	
	pj.defensa[x].nombre = $("#nm_def"+x+"_pj").val();
	pj.defensa[x].tipo = $("#tipo_def"+x+"_pj").val();
	pj.defensa[x].especial = $("#especial_def"+x+"_pj").val();
	pj.defensa[x].gasto = $("#gasto_def"+x+"_pj").val();
	pj.defensa[x].poder = $("#antidaño_def"+x+"_pj").val();
	pj.defensa[x].bonus = $("#bonus_def"+x+"_pj").val();
	x++;

};

//
// Loop For() que extrae del formulario los datos de 
// de cada habilidad, tanto su nombre, tipo,
// descripción y clave. Además avisa de si un dato
// esta vacio.

pj.habilidades= new Object();
for(var i=1; i<9; i++){
	pj.habilidades[i] = new Object();	
	pj.habilidades[i].nombre = $("#nombre_hab"+i+"_pj").val();
	pj.habilidades[i].tipo = $("#tipo_hab"+i+"_pj").val();
	pj.habilidades[i].desc = $("#descripcion_hab"+i+"_pj").val();
	pj.habilidades[i].clave = $("#clave_hab"+i+"_pj").val();
};

pj.bases = new Object();
pj.bases.caballero = $("#baseCaballero").val() || 5;
pj.bases.af = $("#afbc_pj").val();
pj.bases.df = $("#dfbc_pj").val();
pj.bases.ac = $("#acbc_pj").val();
pj.bases.dc = $("#dcbc_pj").val();
pj.bases.ap = $("#apbc_pj").val();
pj.bases.dp = $("#dpbc_pj").val();
pj.bases.baf = $("#afb_pj").val();
pj.bases.bdf = $("#dfb_pj").val();
pj.bases.bac = $("#acb_pj").val();
pj.bases.bdc = $("#dcb_pj").val();
pj.bases.bap = $("#apb_pj").val();
pj.bases.bdp = $("#acb_pj").val();
pj.bases.ba = $("#ba_pj").val();

	if(valor == "actualizar"){
			$('#perfil , #panel_administracion, #panel_moderacion').remove();
			socket.emit("actualizarPJ", pj);
			socket.emit('editar_personaje');
	};
	if(valor == "nuevo"){
		$('#perfil , #panel_administracion, #panel_moderacion').remove();
		socket.emit('nuevo_pj', pj);
		socket.emit('editar_personaje');
	};

console.log(pj.habilidades);
});

$("#estatico").on("click", "#editarPj", function(event){
$('#perfil , #panel_administracion, #panel_moderacion').remove();
socket.emit('editar_personaje');

});

$('#estatico').on("click", "#editPj2", function(event){
	var celdaPadre = $(this).closest("td");
	var hermanos = celdaPadre.siblings("td");
	var celdaId = hermanos[0]['innerText'];
	$('#perfil, #panel_administracion, #panel_moderacion').remove();
	socket.emit('editarPj', celdaId);
})

$('#estatico').on("click", "#eliminarPj", function(event){
	var celdaPadre = $(this).closest("td");
	var hermanos = celdaPadre.siblings("td");
	var celdaId = hermanos[0]['innerText'];
	var filaPadre = celdaPadre.parent("tr")
	filaPadre.remove();
	socket.emit('eliminarPj', celdaId);
})

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
var socket = io.connect();
var total = 0;
var perfil = "";
var tabla = "";



socket.on('formPjEdit', function(datos){
	$("#perfil, #panel_administracion, #panel_moderacion").remove();
	$('#estatico').append(datos);
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
			$('#conectados ul').append($("<li class='"+elemento.bando+"'>").text(elemento.user_id));
		});
		
	};
})
socket.on('listaPj', function(charac){
	$('#perfil, #panel_moderacion, #panel_administracion').remove();
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
var d = $('#mensajes_chat');
d.scrollTop(d.prop("scrollHeight"));

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

socket.on('errorPrivado', function(data){
	var error = "El usuario "+data+" no se encuentra conectado";
	$('#my_ul').append($('<li class="alerta">').text(error));
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

