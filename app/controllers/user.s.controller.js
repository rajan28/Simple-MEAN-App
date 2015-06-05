var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

// var newUser = User({
//  firstname : "bob",
//  lastname : "jones",
//  email : "bob@jones.com",
//  username : "bobjones",
//  password : "bobbyjones"
// });

// // save the user
// newUser.save(function(err) {
//   if (err) throw err;

//   console.log('User created!');
// });

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
        res.set('ErrorMessage', req.flash('error'));
    } else {
        return res.redirect('/');
    }
};

exports.signup = function(req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';

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
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
            return next(err);
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

// exports.listEmailsOnly = function(req, res, next) {
//  User.find({}, 'email', function(err, users) {
//      if (err) {
//          return next(err);
//      }
//      else {
//          res.json(users);
//      }
//  });
// };