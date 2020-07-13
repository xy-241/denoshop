const express = require("express");
const router = express.Router();

const alertMessage = require("../helpers/messenger");
const ensureAuthenticated = require("../helpers/auth");

const DeliveryInfo = require("../models/DeliveryInfo")
const HackingProduct = require("../models/HackingProduct")
const CartItem = require("../models/CartItem")

router.get(["/", "/home"], (req, res) => {
	HackingProduct.findAll().then(hackingProducts => {
		res.render("home", {
		style: { text: "userInterface/home.css" },
		title: "Home",
		current_user: { id: false, is_authenticated: false },

		// Load the hacking products
		hackingProducts,
		// Load the hacking products
	});
	}).catch(err => console.log(err))
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

router.get("/account", ensureAuthenticated, (req, res) => {
	DeliveryInfo.findAll({where: {userId: req.user.id}}).then((deliveryAddrs) =>{
		res.render("user/account", {
		style: { text: "user/management/account.css", text1: "user/management/accountAddress.css"},
		title: "My Account",
		deliveryAddrs
	});
	})
	
});

router.get("/cart", ensureAuthenticated,(req, res) => {
	CartItem.findAll({where: {userId: req.user.id}}).then(cartItems => {
		if(cartItems){
			res.render("user/cart", {
				style: { text: "user/shopping/cart.css" },
				title: "Cart",
				cartItems,
			});
		} else {
			res.render("user/cart", {
				style: { text: "user/shopping/cart.css" },
				title: "Cart"
			});
		}
	}).catch(err => console.log(err))
	
});


module.exports = router;
