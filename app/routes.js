var User = require('../models/users');
var Not = require('../models/noticias');
var Ch = require('../models/characters');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/',function(req, res) {
        Not.bus5(function(err,res2){
            if(err){
                console.log(err);
                res.render('index', {user: req.user}); // load the index.ejs file
            }
            if(res2){
                res.render('index', {user: req.user, not: res2, sin: "Texto"}); // load the index.ejs file
            }

        })
        
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
                console.log(req.user.user_id + " se ha desconectado");
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


    /*Ruta que muestra una noticia con ID*/

    app.get('/noticias/id/:not_id', function(req, res){
        var id = req.params.not_id;
        Not.buscarNoticia(id, function(err, noticia){
            if(noticia){
                var autor = noticia[0].autor;
                User.find({user_id: autor}, function(err, us){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(noticia[0].temas)
                        res.render("noticias", {
                            user: req.user,
                            n: noticia,
                            a: us
                        });
                    }
                })
                
            } else {
                res.redirect("/");
            }
        })

    });

    /*Ruta del Panel de Moderación*/

    app.get("/moderacion", isLoggedIn, function(req, res){
        User.findOne({user_id: req.user.user_id}).exec(function(err, us){
            if(!err){
                if(us.range >= 4){
                    User.find({}).sort({$natural:-1}).limit(5).exec(function(err, us2){
                        if(us2){
                            var usuarios_totales = 0;
                            for(var i=0; i < us2.length; i++ ){
                                 usuarios_totales++;

                            }
                            Ch.verPJ(function(err, pjs){
                                if(!err){
                                    if(pjs){
                                        var pjTotales = 0;
                                        for(var i=0; i<pjs.length; i++){
                                            pjTotales++
                                        }
                                        Not.bus5(function(err, noticias){
                                            if(noticias){
                                                res.render("moderacion", {
                                                    user: req.user,
                                                    n: noticias,
                                                    pj: pjTotales,
                                                    us: us2,
                                                    usT: usuarios_totales
                                                })
                                            }
                                        })
                                    }else {
                                        var pjTotales = 0;
                                        Not.bus5(function(err, noticias){
                                            if(noticias){
                                                res.render("moderacion", {
                                                    user: req.user,
                                                    n: noticias,
                                                    pj: pjTotales,
                                                    us: us2,
                                                    usT: usuarios_totales
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    });
                } else {
                    res.redirec("/");
                }
            }
        })
    })

        app.get("/Smoderacion", isLoggedIn, function(req, res){
        User.findOne({user_id: req.user.user_id}).exec(function(err, us){
            if(!err){
                if(us.range >= 5){
                    User.find({}).sort({$natural:-1}).limit(5).exec(function(err, us2){
                        if(us2){
                            var usuarios_totales = 0;
                            for(var i=0; i < us2.length; i++ ){
                                 usuarios_totales++;

                            }
                            Ch.verPJ(function(err, pjs){
                                if(!err){
                                    if(pjs){
                                        var pjTotales = 0;
                                        for(var i=0; i<pjs.length; i++){
                                            pjTotales++
                                        }
                                        Not.bus5(function(err, noticias){
                                            if(noticias){
                                                res.render("Smoderacion", {
                                                    user: req.user,
                                                    n: noticias,
                                                    pj: pjTotales,
                                                    us: us2,
                                                    usT: usuarios_totales
                                                })
                                            }
                                        })
                                    }else {
                                        var pjTotales = 0;
                                        Not.bus5(function(err, noticias){
                                            if(noticias){
                                                res.render("Smoderacion", {
                                                    user: req.user,
                                                    n: noticias,
                                                    pj: pjTotales,
                                                    us: us2,
                                                    usT: usuarios_totales
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    });
                } else {
                    res.redirec("/");
                }
            }
        })
    })

     // process the signup form
    app.post('/registrar', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
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
