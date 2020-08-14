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
const ProductRating = require("../models/ProductRatings");
const moment = require("moment");
const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

const upload = require("../config/file-upload");

const Sequelize = require("sequelize");

const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

router.get(["/", "/home"], (req, res) => {
	HackingProduct.findAll()
		.then((hackingProducts) => {
			let userLogin = null;
			if (req.user){
				userLogin = "in"
			}
			// Get the total number in the cart
			res.render("home", {
				style: { text: "userInterface/home.css" },
				title: "Home",

				// Load the hacking products
				hackingProducts,
				// Load the hacking products
				userLogin
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
			const d = new Date();

			userRating.forEach(obj => {
				let converter = new QuillDeltaToHtmlConverter(JSON.parse(obj.deltaContent).ops, {});
				comments.push({ "name": obj.user.username, "date": moment(obj.date).format('Do MMMM YYYY'), "rating": obj.rating, "content": converter.convert() });
			});
			console.log(comments);

			ProductRating.findOne({
				where: {
					hackingProductId: req.params.id,
				},
				attributes: [
					monthNames[d.getMonth()]
				],
			}).then(rating => {
				console.log(rating.dataValues[monthNames[d.getMonth()]]);
				res.render("product", {
					title: "Product",
					style: { text: "userInterface/home.css" },
					hackingProduct, comments, rating: rating.dataValues[monthNames[d.getMonth()]].toFixed(1),
				});
			});
		})
	})
});

router.post('/submit_review/:id', (req, res) => {
	// todo: with each review submission recalulate average rating in product rating table
	try {
		// console.log("User ID: ", req.user.id);
		// console.log("type: ", typeof req.body.star);
		// console.log("User rating: ", req.body.star);
		let review = JSON.parse(req.body.quillContent);
		// console.log("Quill Content = ", req.body.quillContent);

		// console.log("Req review text = ", review.text);
		if (review.text.startsWith("\n") || review.text.startsWith(" ") || req.body.star == null) {
			alertMessage(res, 'danger', 'Comment and rating cannot be empty!', '', false);
			res.redirect(`/product/${req.params.id}`);
		} else {
			UserRating.create({
				date: moment().format('YYYY-MM-DD'),
				comment: review.text,
				rating: parseInt(req.body.star),
				deltaContent: JSON.stringify(review.content),
				hackingProductId: req.params.id,
				userId: req.user.id
			}).then(() => {
				const currentDate = new Date();

				ProductRating.findOne({
					where: {
						year: currentDate.getFullYear(),
						hackingProductId: req.params.id,
					}
				}).then(ratings => {
					let monthlyRatings = [ratings.jan, ratings.feb, ratings.mar, ratings.apr, ratings.may, ratings.jun,
					ratings.jul, ratings.aug, ratings.sep, ratings.oct, ratings.nov, ratings.dec];
					console.log("Query Found = ", ratings.id, ratings);
					console.log("Monthly ratings = ", monthlyRatings);

					UserRating.findAll({
						where: {
							hackingProductId: req.params.id,
						}
					}).then(ratings => {
						let starCount = [0, 0, 0, 0, 0];
						ratings.forEach(obj => {
							switch (obj.rating) {
								case 1:
									starCount[0] += 1;
									break;
								case 2:
									starCount[1] += 1;
									break;
								case 3:
									starCount[2] += 1;
									break;
								case 4:
									starCount[3] += 1;
									break;
								case 5:
									starCount[4] += 1;
									break;
							}
						});
						monthlyRatings[currentDate.getMonth()] = (5 * starCount[4] + 4 * starCount[3] + 3 * starCount[2] + 2 * starCount[1] + 1 * starCount[0])
							/ (starCount[4] + starCount[4] + starCount[3] + starCount[2] + starCount[1] + starCount[0]);

						console.log("-------------> Star Count = ", starCount);
						console.log("-------------> Rating = ", monthlyRatings[currentDate.getMonth()]);
						console.log("-------------> Monthly Ratings = ", monthlyRatings);

						ProductRating.update({
							jan: monthlyRatings[0],
							feb: monthlyRatings[1],
							mar: monthlyRatings[2],
							apr: monthlyRatings[3],
							may: monthlyRatings[4],
							jun: monthlyRatings[5],
							jul: monthlyRatings[6],
							aug: monthlyRatings[7],
							sep: monthlyRatings[8],
							oct: monthlyRatings[9],
							nov: monthlyRatings[10],
							dec: monthlyRatings[11],
						}, {
							where: {
								hackingProductId: req.params.id
							}
						});

					})
				})
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

router.post('/api/upload-file', upload.single('image'), (req, res, next) => {
	return res.json({ 'fileUrl': req.file.location });
});

/* router.post('/api/upload-file', (req, res) => {
	return res.json({ 'fileUrl': "https://www.youtube.com/embed/00xVktprdKU" });
}); */

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
