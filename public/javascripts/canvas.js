

var inicio = function(nombre_canvas, funcion){
	var canvas = document.getElementById(nombre_canvas);
	if (canvas.getContext){
  		if(funcion == "Potencial"){
  			var ctx = canvas.getContext('2d');
  		// drawing code here
  		// Dibuja las guias del gráfico
  		var centerX = canvas.width / 2;
  		canvas.height = canvas.width;
  		var centerY = canvas.height / 2;
  		ctx.strokeStyle = "#ffffff";
  		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(0, canvas.width);
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(canvas.height, canvas.width);
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(centerY, 0);
		ctx.stroke();

		// Se guarda el lienzo a como está ahora y se 
		// traslada el centro del lienzo al centro 
		// del cuadro

		ctx.save();
		ctx.translate(centerX, centerY);

		// Dibuja el triángulo básico del gráfico
		var hG100 = (canvas.height*2.5)/100;
		var wD100 = (canvas.width*2.5)/100;
		ctx.beginPath();
		ctx.moveTo(0, -Math.abs(wD100));
		ctx.lineTo(hG100, wD100);
		ctx.lineTo(-Math.abs(hG100), wD100);
		ctx.lineTo(0, -Math.abs(wD100));
		ctx.fillStyle = "#ffffff";
		ctx.fill();
	};
	} else {
  		// canvas-unsupported code here
	}
}

var animacion = function(nombre_canvas, esquina1, tamaño_anterior, variableAumentoEsquina1, contador, intervalDetenido, controlador){

	// Se comprueba que la variable de tamaño este creada y que contiene información.

	if(tamaño_anterior==undefined){
		tamaño_anterior = esquina1; 
		console.log("Esta Indefinida");

	} else {

		// Si la variable de tamaaño anterior es superior a la actual
		// se le da un valor a la variable de Aumento de Esquina
		// En caso de ser False la esquina se encogera,
		// En caso de ser True la esquina se agrandará
		if(controlador==false){
			if(tamaño_anterior>esquina1){
				variableAumentoEsquina1 = false;
				controlador = true;
				console.log("Aumenta");
			} else {
				variableAumentoEsquina1 = true;
				controlador = true;
				console.log("disminuye");
			};

		};
	};

	// Se dibuja con normalidad el 
	// grafico triangular
	//
	//

	var canvas = document.getElementById(nombre_canvas);
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.height, canvas.width);
  	var centerX = canvas.width / 2;
  	canvas.height = canvas.width;
  	var centerY = canvas.height / 2;
  	ctx.strokeStyle = "#ffffff";
  	ctx.beginPath();
	ctx.moveTo(centerX, centerY);
	ctx.lineTo(0, canvas.width);
	ctx.moveTo(centerX, centerY);
	ctx.lineTo(canvas.height, canvas.width);
	ctx.moveTo(centerX, centerY);
	ctx.lineTo(centerY, 0);
	ctx.stroke();

	// Se guarda el lienzo a como está ahora y se 
	// traslada el centro del lienzo al centro 
	// del cuadro

	ctx.save();
	ctx.translate(centerX, centerY);

	// Se toma un 2.5% del tamaño y grosor total
	// de la celda en la que se encuentra el grafico

	var hG100 = (canvas.height*2.5)/100;
	var wD100 = (canvas.width*2.5)/100;
	ctx.beginPath();

	if(variableAumentoEsquina1){

		// Se calcula el tamaño actual de la esquina
		// Y se aplica la linea

		var totalAumentos =  esquina1/5;
		var tamañoF = totalAumentos/contador;
		ctx.moveTo(0, -Math.abs(wD100)*tamañoF);
		console.log("Tamaño aumento" + (-Math.abs(wD100)*tamañoF)); 

	}else{

		// En caso de ser una disminución
		// Se toma el tamaño anterior y actual
		// Se calcula la diferencia
		// y Se produce la disminución

		var diferencia = tamaño_anterior-esquina1;
		var totalDisminuciones = diferencia/5;
		var tamañoF2 = totalDisminuciones/contador;
		ctx.moveTo(0, (-Math.abs(wD100)*tamaño_anterior)+tamañoF2);
		console.log("Tamaño Disminución "+(-Math.abs(wD100)*tamaño_anterior)+tamañoF2);


	};

	// Se dibuja una linea en cualquier posición
	ctx.lineTo(hG100, wD100);
  	ctx.strokeStyle = "#ffffff";
	ctx.stroke();
	ctx.save();
	

	// Se comprueba el contador
	// Si llega a 1 se detiene el intervalo 
	// y se guardan los datos en la variable de tamaño
	// anterior

	if(contador ==1){
		tamaño_anterior=esquina1;
		clearInterval(intervalDetenido);
	}

	// Se aumenta la variable de contador
	contador--;
}
