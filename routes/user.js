const express = require("express");
const router = express.Router();

const alertMessage = require("../helpers/messenger");

// DB Table
const User = require("../models/User");
// DB Table
const bcrypt = require("bcryptjs"); // Salting
router.post("/register", (req, res) => {
	let errors = [];

	let { username, email, password, confirm_password } = req.body;

	if (password.length < 8) {
		errors.push({ text: "Password must be at least 8 characters" });
	}
	if (password !== confirm_password) {
		errors.push({ text: "Password does not match" });
	}
	if (username.length < 3) {
		errors.push({ text: "Username must be at least 3 characters" });
	}

	if (errors.length > 0) {
		res.render("user/register", {
			errors,
			username,
			email,
			password,
			confirm_password,
			style: { text: "user/management/register.css" },
			title: "Register",
		});
	} else {
		User.findOne({ where: { email } }).then((user) => {
			if (user) {
				res.render("user/register", {
					error: user.email + " already registered!",
					username,
					email,
					password,
					confirm_password,
					style: { text: "user/management/register.css" },
					title: "Register",
				});
			} else {
				// Salting
				let salt = bcrypt.genSaltSync(12);
				password = bcrypt.hashSync(password, salt);
				// Salting
				User.create({
					username,
					email,
					password,
				})
					.then((user) => {
						alertMessage(
							res,
							"success",
							username + " added. Please login",
							"fas fa-sign-in-alt",
							true
						);
						res.redirect("/login");
					})
					.catch((err) => console.log(err));
			}
		});
	}
});

module.exports = router;
