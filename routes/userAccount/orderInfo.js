const express = require("express");
const router = express.Router();

const alertMessage = require("../../helpers/messenger");
const ensureAuthenticated = require("../../helpers/auth");

// DB Table
const Order = require("../../models/Order");
// DB Table

// View Order Details
router.get("/view/:id", ensureAuthenticated, (req, res) => {
	res.render("user/account", {
		style: {
			text: "user/management/account.css",
			text1: "user/management/accountAddress.css",
			text2: "user/management/accountOrder.css",
		},
		title: "My Order",
		deliveryAddrs,
		orders
	});
});

module.exports = router;
