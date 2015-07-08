var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var waterfall = require('async-waterfall');
var config = require('../../config/config.js');

var options = {
    auth : {
        api_user : 'koyn',
        api_key : 'krzyzewski1'
    }
};

var transporter = nodemailer.createTransport(sgTransport(options));

var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

exports.renderSignin = function(req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = function(req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
        //res.set('ErrorMessage', req.flash('error'));
    } else {
        return res.redirect('/');
    }
};

exports.signup = function(req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;

        user.provider = (!user.provider) ? 'local' : user.provider;

        user.save(function(err) {
            if (err) {
                var message = getErrorMessage(err);

                req.flash('error', message);
                return res.redirect('/register');
            }
            req.login(user, function(err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.saveOAuthUserProfile = function(req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function(err, user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

                User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                    profile.username = availableUsername;

                    user = new User(profile);

                    user.save(function(err) {
                        if (err) {
                            var message = getErrorMessage(err);

                            req.flash('error', message);
                        }

                        return done(err, user);
                    });
                });
            } else {
                return done(err, user);
            }
        }
    });
};

exports.requiresLogin = function(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.status(401).send( {
            message : 'User is not logged in'
        });
    }
    next();
};

////my code////

exports.createNewUser = function(req, res, next) {

    var user = new User(req.body);

    //user.provider = 'posted';

    user.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};

exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        }
        else {
            res.json(users);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
    User.findOne( {
        _id : id
    }, function(err, user) {
        if (err) {
            return next(err);
        }
        else {
            req.user = user;
            next();
        }
    });
};

exports.updateByID = function(req, res, next) {
    var user = req.user;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.gender = req.body.gender;
    user.birthday = req.body.birthday;
    user.email = req.body.email;
    user.username = req.body.username;
    if (crypto.pbkdf2Sync(req.body.password, req.body.salt, 10000, 64).toString('base64') === user.password) {
        user.password = req.body.password;
    }
    else {
        return res.status(400).send( {
            message : 'Invalid Password'
        });
    }
    user.city = req.body.city;
    user.group1 = req.body.group1;
    user.group2 = req.body.group2;
    user.group3 = req.body.group3;
    user.salt = req.body.salt;
    user.provider = req.body.provider;
    user.providerId = req.body.providerId;
    user.created = req.body.created;
    user.save(function(err) {
        if(err) {
            return res.status(400).send( {
                message : getErrorMessage(err)
            });
        }
        else {
            res.json(user);
        }
    });
};

exports.deleteByID = function(req, res, next) {
    req.user.remove( function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.user);
        }
    });
};

exports.deleteAll = function(req, res, next) {
    User.find({}, function(err, users) {
        var numUsers = users.length;
        for (i = 0; i < numUsers; i++) {
            users[i].remove(function (err) {
                if (err) {
                    return next(err);
                }
            })
        }
        console.log('All Users Have Been Deleted!');
        res.redirect('/');
    });
};

exports.sendPasswordResetMail = function(req, res, next) {
    console.log(req.body);
    waterfall( [
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({email : req.body.resetpasswordemail}, function(err, user) {
                if(!user) {
                    console.log('Error. No account with that email address exists.');
                    return res.redirect('/#!/password');
                }

                console.log('hi4');
                user.resetPasswordToken = token;
                user.tokenExpiration = Date.now() + 3600000;


                user.save(function(err) {
                    done(err, token, user);
                });
                console.log('hi5');
            });
        },
        function(token, user, done) {
            console.log(user);
            transporter.sendMail({
                from: 'no-reply@koyn.io',
                to: user.email,
                subject: 'Koyn Password Reset',
                text: 'You are receiving this because you (or someone else) have requested a password reset for your account.\n\n' +
                      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                      config.mainURL + '/passwordreset/' + token + '\n\n' +
                      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }, function(err) {
                if (err) return err;
                console.log('message sent');
                done(err, 'done');
            });
        }
    ], function(err) {
        if(err) {
            return next(err);
        }
        res.redirect('/#!/password');
    });
};

exports.renderPasswordReset = function(req, res) {
    User.findOne( {resetPasswordToken: req.params.token, tokenExpiration: {$gt: Date.now()}}, function(err, user) {
        if (!user) {
            console.log('Error, Password reset token is invalid or has expired.');
            return res.redirect('/#!/password');
        }
        res.render('passwordreset', {
            user: req.user
        });
    });
};

exports.resetPassword = function(req, res) {
    waterfall( [
        function(done) {
            User.findOne( {resetPasswordToken: req.params.token, tokenExpiration: {$gt: Date.now()}}, function(err, user) {
                if (!user) {
                    console.log('Error, Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                
                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.tokenExpiration = undefined;

                user.save(function(err) {
                    req.login(user, function(err) {
                        done(err, user);
                    });
                });
            });
        },
        function(user, done) {
            transporter.sendMail( {
                from: 'no-reply@koyn.io',
                to: user.email,
                subject: 'Password Successfully Changed!',
                text: 'Hello,\n\n' +
                      'This is a confirmation that the password for your account ' + user.username + ' (' + user.email + ')' + ' has just been changed.\n'
            }, function(err) {
                    done(err);
            });
        }
    ], function(err) {
        res.redirect('/');
    });
};