const express = require("express");
const router = express.Router();

const alertMessage = require("../helpers/messenger");
const ensureAuthenticated = require("../helpers/auth");

const DeliveryInfo = require("../models/DeliveryInfo");
const HackingProduct = require("../models/HackingProduct");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order")

const User = require("../models/User");
const UserRating = require("../models/UserRating");
const currentDate = new Date();
const moment = require("moment");
const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;
const multer = require('multer');
const upload = multer();

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

router.get("/product/:id", (req, res) => {
	HackingProduct.findOne({
		where: {
			id: req.params.id,
		}
	}).then(hackingProduct => {
		UserRating.findAll({
			where: {
				hackingProductId: req.params.id,
			},
			include: [
				{
					model: User
				}
			],
		}).then(userRating => {
			let comments = [];
			userRating.forEach(obj => {
				let converter = new QuillDeltaToHtmlConverter(JSON.parse(obj.deltaContent).ops, {});
				comments.push({ "name": obj.user.username, "rating": obj.rating, "content": converter.convert() });
			});
			console.log(comments);
			res.render("product", {
				title: "Product",
				style: { text: "userInterface/home.css" },
				hackingProduct, comments
			});
		})
	})
});

router.post('/submit_review/:id', (req, res) => {
	// todo: with each review submission recalulate average rating in product rating table
	try {
		console.log("User ID: ", req.user.id);
		console.log("type: ", typeof req.body.star);
		console.log("User rating: ", req.body.star);
		let review = JSON.parse(req.body.quillContent);
		console.log("Quill Content = ", req.body.quillContent);

		console.log("Req review text = ", review.text);
		if (review.text.startsWith("\n") || review.text.startsWith(" ") || req.body.star == null) {
			alertMessage(res, 'danger', 'Comment and rating cannot be empty!', '', false);
			res.redirect(`/product/${req.params.id}`);
		} else {
			UserRating.create({
				date: moment().format('DD/MM/YYYY HH:mm:ss'),
				comment: review.text,
				deltaContent: JSON.stringify(review.content),
				rating: parseInt(req.body.star),
				hackingProductId: req.params.id,
				userId: req.user.id
			}).then(() => {
				console.log("Comment Added");
				res.redirect(`/product/${req.params.id}`);
			});
		}
	} catch {
		console.log("Not Logged in");
		alertMessage(res, 'danger', 'Please login to comment', 'fas fa-sign-in-alt', true);
		res.redirect("/login");
	}
});

router.post('/api/upload-image', (req, res) => {
	console.log("image received", req.body);
	let imageUrl = "https://res.cloudinary.com/dchpyunul/image/upload/v1595087407/denoshop/hackingProducts/outfits/300-300-maxout_kakwk7.jpg";
	res.json({ "imageUrl": imageUrl });
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
