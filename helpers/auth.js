const alertMessage = require("./messenger");

const ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		// Is user is authenticated
		return next(); // Proceed to the next statement
	}

	alertMessage(
		res,
		"danger",
		"Access Denied",
		"fas fa-exclamation-circle",
		true
	);
	res.redirect("/login");
};

module.exports = ensureAuthenticated;
