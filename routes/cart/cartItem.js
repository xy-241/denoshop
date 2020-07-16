const express = require("express");
const router = express.Router();

const alertMessage = require("../../helpers/messenger");
const ensureAuthenticated = require("../../helpers/auth");
const moment = require("moment");

// DB Table
const DeliveryInfo = require("../../models/CartItem");
const HackingProduct = require("../../models/HackingProduct");
const CartItem = require("../../models/CartItem");
// DB Table

router.get("/cartNum", (req, res) => {
	CartItem.findAll({
		where: { userId: req.user.id },
	})
		.then((cartItems) => {
			let totalNum = 0;
			for (let i = 0; i < cartItems.length; i++) {
				totalNum += cartItems[i].itemNum;
            }
            res.json(totalNum)
        })
        
		.catch((err) => console.log(err));
});

// Add product to cart
router.post("/add", ensureAuthenticated, (req, res) => {
	let { title } = req.body;

	HackingProduct.findOne({ where: { title } })
		.then((hackingProduct) => {
			// Find if the product is in the db
			CartItem.findOne({ where: { title, userId: req.user.id } })
				.then((cartItem) => {
					let rawDate = new Date();
					let dateAdded = moment(rawDate, "DD/MM/YYYY");

					// If item already added before, then add 1 to the item number
					if (cartItem) {
						updateCartEntry = {
							dateAdded,
							itemNum: cartItem.itemNum + 1,
						};
						CartItem.update(updateCartEntry, {
							where: { id: cartItem.id },
						}).then((result) => {
							res.json("Updated!");
						});
					} else {
						// If never added before, then add new entry in the CartItem table
						let cartEntry = {
							price: hackingProduct.price,
							imageFile: hackingProduct.imageFile,
							dateAdded,
							title: hackingProduct.title,
							itemNum: 1,
							userId: req.user.id,
						};
						CartItem.create(cartEntry)
							.then((result) => {
								console.log("Item Added!");
							})
							.catch((err) => console.log(err));
					}
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
});

// Delete product from cart
router.post("/removeItem", ensureAuthenticated, (req, res) => {
	let { title } = req.body;
	CartItem.findOne({ where: { title, userId: req.user.id } })
		.then((cartItem) => {
			if (cartItem) {
				CartItem.destroy({ where: { title, userId: req.user.id } })
					.then((result) => {
						res.json("Cart item deleted successfully!");
					})
					.catch((err) => console.log(err));
			} else {
				res.json("No Entry Found!");
			}
		})
		.catch((err) => console.log(err));
});

// Update the number in the cart
router.post("/valueUpdate", (req, res) => {
	let { title, itemNum } = req.body;
	updateNumEntry = { title, itemNum };
	// console.log(updateNumEntry)
	CartItem.findOne({ where: { title, userId: req.user.id } })
		.then((cartItem) => {
			if (cartItem) {
				CartItem.update(updateNumEntry, {
					where: { id: cartItem.id },
				}).then((result) => {
					res.json("Updated!");
				});
			} else {
				res.json("Item Entry Not Found!");
			}
		})
		.catch((err) => console.log(err));
});

module.exports = router;
