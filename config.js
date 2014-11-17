module.exports = {
    
    port: process.env.PORT || 3000,


    /**
     * ExpressJS settings
     * http://expressjs.com/guide.html
     */
    express: {
        // use on express.session
        secret: process.env.SECRET || 'secretkey',
        key: process.env.KEY || ''

    },

    /**
     * MongoDB Connection
     * https://www.mongohq.com/signup/
     */
    mongodb: {
        host: process.env.MONGODB_HOST || '',
        port: process.env.MONGODB_PORT || '',
        db: process.env.MONGODB_DATABASE || '',
        username: process.env.MONGODB_USERNAME || '',
        password: process.env.MONGODB_PASSWORD || ''
    }

    };
