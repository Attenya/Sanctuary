socket = require("socket.io");

var chatControllers2 = function(app){
	var io = socket.listen(app);

	io.on('connection', function(socket){
	console.log("pepito2");
	});

};

module.exports = chatControllers2;