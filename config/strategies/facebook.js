var passport = require('passport');
var url = require('url');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
var users = require('../../app/controllers/user.s.controller');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function() {
    // passport.use(new FacebookStrategy( {
    //     clientID: config.facebook.clientID,
    //     clientSecret: config.facebook.clientSecret,
    //     callbackURL: config.facebook.callbackURL,
    //     passReqToCallback: true
    // }, function(req, accessToken, refreshToken, profile, done) {
    //     var providerData = profile._json;
    //     providerData.accessToken = accessToken;
    //     providerData.refreshToken = refreshToken;

    //     console.log(profile);

    //     var providerUserProfile = {
    //         firstName: profile.name.givenName,
    //         lastName: profile.name.familyName,
    //         fullName: profile.displayName,
    //         //email: profile.emails[0].value,
    //         username: profile.username,
    //         provider: 'facebook',
    //         providerId: profile.id,
    //         providerData: providerData
    //     };

    //     users.saveOAuthUserProfile(req, providerUserProfile, done);
    // }));

    passport.use('facebook', new FacebookStrategy({
        clientID : '1582944231965493',
        clientSecret : '14545a169a4f2ae33a5f2d485fbdb38e',
        callbackURL : 'http://localhost:8000/oauth/facebook/callback',
        passReqToCallback: true
    },
     
      // facebook will send back the tokens and profile
      function(req, access_token, refresh_token, profile, done) {
        // asynchronous
        process.nextTick(function() {
         
          // find the user in the database based on their facebook id
          User.findOne({ 'id' : profile.id }, function(err, user) {
     
            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
              return done(err);
     
              // if the user is found, then log them in
              if (user) {
                return done(null, user); // user found, return that user
              } else {

                var providerData = profile._json;
                // providerData.accessToken = accessToken;
                // providerData.refreshToken = refreshToken;

                var providerUserProfile = {
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    fullname: profile.displayName,
                    birthday: providerData.birthday,
                    gender: providerData.gender.charAt(0).toUpperCase() + providerData.gender.slice(1),
                    email: profile.emails[0].value,
                    username: profile.username,
                    password: 'password',
                    provider: 'facebook',
                    providerId: profile.id
                };

                // // if there is no user found with that facebook id, create them
                // var newUser = new User();
     
                // // set all of the facebook information in our user model
                // newUser.id    = profile.id; // set the users facebook id                 
                // newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user                    
                // newUser.fb.firstName  = profile.name.givenName;
                // newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
                // newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
     
                // save our user to the database
                // newUser.save(function(err) {
                //   if (err)
                //     throw err;
                
                //   // if successful, return the new user
                //   return done(null, newUser);

                users.saveOAuthUserProfile(req, providerUserProfile, done);

                };
             }); 
          });
        })
    );
};