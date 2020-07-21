const express = require("express");
const router = express.Router();

const alertMessage = require("../../helpers/messenger");
const ensureAuthenticated = require("../../helpers/auth");

// DB Table
const Order = require("../../models/Order");
// DB Table

router.put("/update/:id", ensureAuthenticated, (req, res) => {
    console.log(req.params.id)
	DeliveryInfo.findOne({ where: { id: req.params.id } })
		.then((deliveryAddr) => {
			// Prevent unauthorised users
			if (deliveryAddr.userId !== req.user.id) {
				alertMessage(
					res,
					"danger",
					"Unauthorised access to this user",
					"fas fa-exclamation-circle",
					true
				);
				req.logout();
				res.redirect("/login");
			} else if (deliveryAddr) {
				let {
					receiverName,
					phoneNo,
					country,
					state,
					city,
					blockNo,
					street,
					unitNo,
					postcode,
				} = req.body;
                let userId = req.user.id;
                let updateObject = {
                    receiverName,
                    phoneNo,
                    country,
                    state,
                    city,
                    blockNo,
                    street,
                    unitNo,
                    postcode,
                    userId
                }
                console.log(updateObject)
				DeliveryInfo.update(updateObject, { where: { id: req.params.id } })
					.then((destroyInfo) => {
						alertMessage(
							res,
							"info",
							"Address Updated!",
							"fas fa-trash-alt",
							true
						);
						res.redirect("/account");
					})
					.catch((err) => console.log(err));
			} else {
				alertMessage(
					res,
					"info",
					"Oops, something went wrong. Please try again later",
					"fas fa-trash-alt",
					true
				);
			}
		})
		.catch((err) => console.log(err));
});

// Delete delivery address
router.get("/delete/:id", ensureAuthenticated, (req, res) => {
	DeliveryInfo.findOne({ where: { id: req.params.id } })
		.then((deliveryAddr) => {
			// Prevent unauthorised users
			if (deliveryAddr.userId !== req.user.id) {
				alertMessage(
					res,
					"danger",
					"Unauthorised access to this user",
					"fas fa-exclamation-circle",
					true
				);
				req.logout();
				res.redirect("/login");
			} else if (deliveryAddr) {
				DeliveryInfo.destroy({ where: { id: req.params.id } })
					.then((destroyInfo) => {
						alertMessage(
							res,
							"info",
							"Address deleted!",
							"fas fa-trash-alt",
							true
						);
						res.redirect("/account");
					})
					.catch((err) => console.log(err));
			} else {
				alertMessage(
					res,
					"info",
					"Oops, something went wrong. Please try again later",
					"fas fa-trash-alt",
					true
				);
			}
		})
		.catch((err) => console.log(err));
});
module.exports = router;
