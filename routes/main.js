const express = require("express");
const router = express.Router();

const alertMessage = require("../helpers/messenger");
const ensureAuthenticated = require("../helpers/auth");

const DeliveryInfo = require("../models/DeliveryInfo");
const HackingProduct = require("../models/HackingProduct");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order")

const Sequelize = require("sequelize");

router.get(["/", "/home"], (req, res) => {
	HackingProduct.findAll()
		.then((hackingProducts) => {
			// Get the total number in the cart
			res.render("home", {
				style: { text: "userInterface/home.css" },
				title: "Home",

				// Load the hacking products
				hackingProducts,
				// Load the hacking products
			});
		})
		.catch((err) => console.log(err));
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

router.get("/account", ensureAuthenticated, async (req, res) => {

	let deliveryAddrs = await DeliveryInfo.findAll({ where: { userId: req.user.id } })
		.then((deliveryAddrs) => {
			return deliveryAddrs
		});

	let orders = await Order.findAll({
		where: {
				userId: req.user.id
			},
		include: [DeliveryInfo]
	}).then((order) => {
		console.log(order)
		return order
	});
	res.render("user/account", {
		style: {
			text: "user/management/account.css",
			text1: "user/management/accountAddress.css",
			text2: "user/management/accountOrder.css",
		},
		title: "My Account",
		deliveryAddrs,
		orders
	});
});

router.get("/cart", ensureAuthenticated, (req, res) => {
	CartItem.findAll({ where: { userId: req.user.id } })
		.then((cartItems) => {
			if (cartItems) {
				res.render("user/cart", {
					style: { text: "user/shopping/cart.css" },
					title: "Cart",
					cartItems,
				});
			} else {
				res.render("user/cart", {
					style: { text: "user/shopping/cart.css" },
					title: "Cart",
				});
			}
		})
		.catch((err) => console.log(err));
});

module.exports = router;
