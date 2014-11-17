var mongoose = require('mongoose'),
 bcrypt   = require('bcrypt-nodejs');

Schema = mongoose.Schema;
var usuario_schema = new Schema({
	user_id: {type: String, index: { unique: true }} ,
	mail: String,
	password: String,
	created_at: {type: Date, default: Date.now},
	range: {type: Number, default: 1},
	badges: {type: Number, default: 0},
	avatar: [],
	bando: {type: String, default: 'Soldado sin nombre'},
	characters: [],
	chat: String,
	sala: String
});

// methods ======================
// generating a hash
usuario_schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usuario_schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('Usuario', usuario_schema);