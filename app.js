var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var app = express();
var http = require('http').createServer(app);

var routes = require('./routes');
var users = require('./controllers/users');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var configDB = require('./config/database.js');
var mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');

var chat = require('./controllers/socketsControllers');
var config = require('./config.js')
var uriUtil = require('mongodb-uri');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       

var mongodbUri = 'mongodb://dbuser:dbpass@host:port/dbname';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
/*Configuración de la Base de Datos*/
mongoose.connect(mongooseUri, options);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout') // defaults to 'layout' 



/*Store de sessions*/



/**/
app.use(favicon());
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: config.express.secret,
    key: config.express.key
}));


app.use(express.static(path.join(__dirname, 'public')));
/*Inicialización de Layout*/
app.use(expressLayouts)
/*Inicialización de Passport*/
app.use(passport.initialize());
app.use(passport.session(

    ));
app.use(flash()); // use connect-flash for flash messages stored in session
 // uncomment this line
require('./config/passport')(passport); // pass passport for configuration
/*Control de las routas*/
require('./app/routes.js')(app, passport);
chat(http);

/*
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
*/


http.listen(config.port, function(){
    console.log('El servidor funciona en el puerto 3000');
});
