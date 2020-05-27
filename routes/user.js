const express = require("express");
const router = express.Router();

const alertMessage = require("../helpers/messenger");

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
		let successMsg = `${email} registered successfully`;

		res.render("user/login", {
			successMsg,
			style: { text: "user/management/login.css" },
			title: "Login",
		});
	}
});

module.exports = router;
