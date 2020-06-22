require("dotenv").config();
const User = require("../models/User"); // Load the user model

const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy;
const moment = require("moment");

module.exports = function(passport){
    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) =>  {
        // DateJoined
        let rawDate = new Date();
		let dateJoined = moment(rawDate, "DD/MM/YYYY");
        const newUser = {
            githubId: profile.id,
            username: profile.displayName,
            imageFile: profile.photos[0].value,
            dateJoined
        }

        try {
            User.findOne({where: {githubId: profile.id}}).then((user) =>{
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
    }
));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}