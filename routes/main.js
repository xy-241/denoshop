const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("home", {
		style: { text: "userInterface/home.css" },
		title: "Home",
		current_user: { id: false, is_authenticated: false },
	});
});

router.get("/login", (req, res) => {
	res.render("user/login", {
		style: { text: "user/management/login.css" },
		title: "Login",
	});
});

router.get("/register", (req, res) => {
	res.render("user/register", {
		style: { text: "user/management/register.css" },
		title: "Register",
	});
});

module.exports = router;
