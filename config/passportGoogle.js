require("dotenv").config();
const User = require("../models/User"); // Load the user model

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//const alertMessage = require("../helpers/messenger");


module.exports = function(passport){
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLECLIENTID,
    clientSecret: process.env.GOOGLECLIENTSECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) =>{
    const newUser = {
      googleId: profile.id,
      username: profile.displayName,
      imageFile: profile.photos[0].value
    }

    try {
      User.findOne({googleId: profile.id}).then((user) =>{
        if (user){
          done(null, user);
        } else{
          User.create(newUser).then((user) => {
						done(null, user);
					})
					.catch((err) => console.log(err));
        }
      })
    } catch (err) {
      console.log(err)
    }
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));});
}