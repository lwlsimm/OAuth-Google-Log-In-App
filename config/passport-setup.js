const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys')
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
});

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
  }, (accessToken, refreshToken, profile, done) => {
    //check if user exists in db
    User.findOne({
      googleId: profile.id
    }).then((currentUser) => {
      if(currentUser) {
        console.log('user is ', currentUser);
        done(null, currentUser)
      } else {
      new User({
        username: profile.displayName,
        googleId: profile.id, 
        thumbnail: profile._json.picture
      }).save().then((newUser)=>{
      console.log(`New user created: ${newUser}`)
      done(null, newUser)
    })
        }
      }) 
  }
));