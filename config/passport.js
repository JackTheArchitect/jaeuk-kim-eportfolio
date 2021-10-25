const passport = require('passport');

module.exports = function() {
  const User = require('../models/user');
  
  // user data를 json 전환? 아니면 그 반반대?
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 그 반대?
  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    }, '-password -salt', (err, user) => {
      done(err, user);
    });
  });

  require('./local')();
};