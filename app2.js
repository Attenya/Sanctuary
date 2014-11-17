var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var routes = require('./routes');
var users = require('./controllers/users');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Control Socket.io
io.on('connection', function(socket){
    console.log("Un nuevo usuario conectado");
    socket.on('chat', function(msg){
    console.log("mensaje: "+ msg)
    io.emit('chat', msg)
    });
    socket.on('disconnect', function(){
    console.log("Un usuario se ha desconectado");
    io.emit("dsc", "Un usuario se ha desconectado");
    });
    //funcion que une a un socket a una room concreta
    socket.on('unir', function(room){
    console.log("un usuario se ha unido a la room "+room);
    socket.join(room);
    io.sockets.in(room).emit("unir", "Un usuario se ha unido al room");
    });
    socket.on("dscroom", function(room){
    console.log("Un usuario se ha desconectado de la room " + room);
    socket.leave(room);
    });
});


/*Store de sessions*/



/**/
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('notsecretKey'));
app.use(session({
    secret: 'appsecret',
    key: 'express.sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: new Date(Date.now() + 3600000)
    },
    store: new MongoStore({
        db: 'usuarios',
    })
}));


app.use(express.static(path.join(__dirname, 'public')));



routes.setup(app);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});



http.listen(3000, function(){
    console.log('El servidor funciona en el puerto 3000');
});
