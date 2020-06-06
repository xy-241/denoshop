const express = require("express");
const router = express.Router();

const alertMessage = require("../helpers/messenger");

router.get(["/", "/home"], (req, res) => {
	let hackingProducts = [
		{
			category: "tools",
			title: "Arduino",
			imageFile: "http://tinyurl.com/yb2z9wdb",
			price: "20",
		},
		{
			category: "tools",
			title: "Raspberry Pi",
			imageFile: "http://tinyurl.com/y8zhlj94  ",
			price: "50",
		},
		{
			category: "outfits",
			title: "Deno Cap",
			imageFile: "http://tinyurl.com/ycxvfan5",
			price: "10",
		},
		{
			category: "outfits",
			title: "Deno Hoodie",
			imageFile: "http://tinyurl.com/y7xhusrj",
			price: "40",
		},
	];
	res.render("home", {
		style: { text: "userInterface/home.css" },
		title: "Home",
		current_user: { id: false, is_authenticated: false },

		// Load the hacking products
		hackingProducts,
		// Load the hacking products
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

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

router.get("/account", (req, res) => {
	res.render("user/account", {
		style: { text: "user/management/account.css" },
		title: "My Account",
	});
});

router.get("/cart", (req, res) => {
	const cartItems = [
		{
			price: "10",
			imageFile: "http://tinyurl.com/yb2z9wdb",
			dateAdded: "2020-10-21",
			itemNum: 1,
		},
	];
	res.render("user/cart", {
		style: { text: "user/shopping/cart.css" },
		title: "Cart",
		cartItems,
	});
});
module.exports = router;
