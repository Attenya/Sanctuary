var crypto = require('crypto'),
    config = require('../config.js');

/*Funcion que encripta la password del usuario.*/

exports.passwordHash = function( password ){

    // create a md5 from string password and hash
    var passwordHash = crypto.createHash('md5').update( password + '_' + config.salt ).digest('hex');

    return passwordHash;

}