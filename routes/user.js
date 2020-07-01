const express = require("express");
const router = express.Router();
const moment = require("moment");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey);

const alertMessage = require("../helpers/messenger");
const ensureAuthenticated = require("../helpers/auth");

// DB Table
const User = require("../models/User");
// DB Table
const bcrypt = require("bcryptjs"); // Salting
const passport = require("passport"); // For authentication
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
				let rawDate = new Date();
				let dateJoined = moment(rawDate, "DD/MM/YYYY");
				let stripeId ="";
				stripe.customers.create(
					{
					email: email,
					},
					function(err, customer) {
						if (err){
							console.log(err)
						} else {
							stripeId = customer.id;
							console.log(stripeId);
							console.log("Customer create successfully");
							User.create({
								username,
								email,
								password,
								dateJoined,
								stripeId
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
					}
				);
			}
		});
	}
});

// Login from POST => /user/login
router.post("/login", (req, res, next) => {
	passport.authenticate("local", {
		// Calling the function defined in /config/passport.js
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	})(req, res, next);
});

router.put("/update/:id", ensureAuthenticated, (req, res) => {
	let { username, email, deliveryInfo, imageFile } = req.body;

	let originalUsername = req.user.username;
	let originalImageFile = req.user.imageFile;
	let originalEmail = req.user.email;
	let originalDeliveryInfo = req.user.deliveryInfo;

	// Checking for updated fields
	let updateObject = {};
	if (username !== originalUsername) {
		updateObject.username = username;
	}
	if (email !== originalEmail) {
		updateObject.email = email;
	}
	if (imageFile !== "" && imageFile !== originalImageFile) {
		updateObject.imageFile = imageFile;
	}
	if (deliveryInfo !== originalDeliveryInfo) {
		updateObject.deliveryInfo = deliveryInfo;
	}
	let itemNum = 0;
	for (let key in updateObject) {
		itemNum += 1;
	}
	console.log(itemNum);
	console.log(updateObject);

	if (itemNum === 0) {
		alertMessage(
			res,
			"danger",
			"Please edit your info before updating it!",
			"fas fa-sign-in-alt",
			true
		);
		res.redirect("/account");
	} else {
		//
		User.findOne({ where: { id: req.params.id } }).then((user) => {
			if (user.id !== req.user.id) {
				alertMessage(
					res,
					"danger",
					"Unauthorised access to this user",
					"fas fa-exclamation-circle",
					true
				);
				req.logout();
				res.redirect("/login");
			} else {
				//
				User.update(updateObject, { where: { id: req.params.id } })
					.then(() => {
						alertMessage(
							res,
							"success",
							"Info updated successfully!",
							"fas fa-sign-in-alt",
							true
						);
						res.redirect("/account");
					})
					.catch((err) => console.log(err));
			}
		});
	} // else
});

router.get("/delete/:id", ensureAuthenticated, (req, res) => {
	User.findOne({ where: { id: req.params.id } }).then((user) => {
		if (user.id !== req.user.id) {
			alertMessage(
				res,
				"danger",
				"Unauthorised access to this user",
				"fas fa-exclamation-circle",
				true
			);
			req.logout();
			res.redirect("/login");
		} else {
			User.destroy({ where: { id: req.params.id } }).then((user) => {
				alertMessage(
					res,
					"info",
					req.user.email + " deleted!",
					"fas fa-trash-alt",
					true
				);
				req.logout();
				res.redirect("/register");
			});
		}
	});
});
module.exports = router;
