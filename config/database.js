// config/database.js
var config = require("../config");

module.exports = {

 host: process.env.MONGODB_HOST || '',
        port: process.env.MONGODB_PORT || '',
        db: process.env.MONGODB_DATABASE || '',
        username: process.env.MONGODB_USERNAME || '',
        password: process.env.MONGODB_PASSWORD || ''

};
