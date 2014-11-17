var User = require('../models/users');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/',function(req, res) {
        res.render('index', {user: req.user}); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/conectar', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('conectar', { message: req.flash('loginMessage'), user: req.user}); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/registrar', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('registro', { message: req.flash('signupMessage'), user: req.user});
    });

 app.get('/usuario', isLoggedIn, function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('perfil');
    });
    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/usuario/:user_id', isLoggedIn, function(req, res) {
        res.render('perfil', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/desconectar', function(req, res) {
        User.findOne({user_id: req.user.user_id}, function(err, user){
            if(err){return next(err)};
            if(user){
                user.chat = "desconectado";
                user.save(function(err){
                    if(err){
                        return next(err);
                    } else {
                        req.logout();
                        res.redirect('/');
                    }
                })
            }
        })
        

        
    });

     // process the signup form
    app.post('/registrar', passport.authenticate('local-signup', {
        successRedirect : '/usuario/:user_id', // redirect to the secure profile section
        failureRedirect : '/registrar', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

     app.post('/conectar',  passport.authenticate('local-login', {

        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/conectar', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
