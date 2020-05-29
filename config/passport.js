const LocalStrategy = require("passport-local").Strategy; // Get the local strategy
const bcrypt = require("bcryptjs"); // Use to compare the salted password
const User = require("../models/User"); // Load the user model

function localStrategy(passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email" }, // take the email as the usernameField, because we login with email
			// Creating a method to find,compare and return
			(email, password, done) => {
				User.findOne({ where: { email } }).then((user) => {
					// If user not found
					if (!user) {
						return done(null, false, { message: "No User Found" });
					}
					// If user found
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err; // If any unexpected err happened
						if (isMatch) {
							return done(null, user); // If matched return the user, the user object will also be set into req.user for app to retrieve user object. referring to index.js
						} else {
							return done(null, false, {
								message: "Password Incorrect",
							}); // If user is not found
						}
					});
				});
			}
			// Creating a method to find,compare and return
		)
	);

	// When user is authenticated
	//
	// Serializes (stores) user id into session which is stored in the session table of mysql upon successful authentication
	passport.serializeUser((user, done) => {
		done(null, user.id); // user.id used to identify authenticated user
	});

	// User object is retrieved by userId from session for every subsequent user request if passport finds a user object in the session table
	// Passport then passes userId
	passport.deserializeUser((userId, done) => {
		User.findByPk(userId)
			.then((user) => {
				done(null, user); // user object saved in req.session - set user object into req.user
			})
			.catch((done) => {
				console.log(done); // No user found, not stored in req.session
			});
	});
}

module.exports = { localStrategy };
