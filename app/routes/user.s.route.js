var user = require('../controllers/user.s.controller.js');
var mongoose = require('mongoose');
var collection = mongoose.Collection;
var passport = require('passport');

module.exports = function(app) {
    app.route('/register')
        .get(user.renderSignup)
        .post(user.signup);

    app.route('/login')
        .get(user.renderSignin)
        .post(passport.authenticate('local', { 
            successRedirect : '/',
            failureRedirect : '/login',
            failureFlash : true
        }));

    app.get('/oauth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'user_friends', 'email'],
        failureRedirect : '/login'
    }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login',
        successRedirect: '/'
    }));

    app.get('/signout', user.signout);

    app.route('/users')
        .get(user.list)
        .post(user.createNewUser)
        .delete(user.deleteAll);;

    app.route('/users/:userId')
        .get(user.read)
        .put(user.updateByID)
        .delete(user.deleteByID);

    //will be executed before any middleware registered...
    //...with the :userId request parameter
    app.param('userId', user.userByID);
}

//Create mobile routes by using the provider

//separate routes (frontend vs backend-only) by routing with /#! prefix...this should enable info to go to the correct spot?