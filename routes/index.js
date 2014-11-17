var users = require('../controllers/users');
var home = require('../controllers/home');
var user;

function auth(req,res,next){

    var path = ( req.path == null ) ? '/' : req.path;
    if(user){
    	res.send({user: user})
        
    }
	next();
}

exports.setup = function( _app ){

    _app.get( '/', auth, home.index);
    _app.get('/user',  auth, users.find);
	_app.get('/user/:user_id', auth, users.show_edit);
	_app.post('/user/:user_id',  auth, users.update);
	_app.get('/delete-user/:user_id', auth,  users.remove);
	_app.get('/registrar', auth,  users.create);
	_app.post('/registrar', auth,  users.create);
	_app.get('/conectar', auth,  users.login);
	_app.post('/conectar', auth,  users.login);
	_app.get('/desconectar', auth,  users.unLogin);

    //_app.get( '/users/:user' )
}
