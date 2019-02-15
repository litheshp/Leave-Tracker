var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
User = require('mongoose').model('User');
module.exports = function() {
passport.use(new LocalStrategy(function(username, password, done) {
User.findOne({
username: username
}, function(err, user) {


if (err) {
  console.log(err);
return done(err);
}
if (!user) {
  console.log('Unknown user');
return done(null, false, {
message: 'Unknown user'
});
}

if (!user.authenticate(password)) {
  console.log('Invalid password');
return done(null, false, {
message: 'Invalid password'
});
}
console.log(user)
return done(null, user);
});
}));
};
