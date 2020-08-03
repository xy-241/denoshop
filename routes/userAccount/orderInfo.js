const express = require("express");
const router = express.Router();

const alertMessage = require("../../helpers/messenger");
const ensureAuthenticated = require("../../helpers/auth");

// DB Table
const Order = require("../../models/Order");
const PurchaseRecord = require("../../models/PurchaseRecord");
const HackingProduct = require("../../models/HackingProduct");
// DB Table

// Retrieve Order Items
router.get("/retrieve/:id", ensureAuthenticated, (req, res) => {
	let orderId = req.params.id
	let userId = req.user.id

	Order.findOne({
		where: {
			id: orderId,
			userId: userId
		},
		include: [PurchaseRecord]
	}).then(async (order) => {
		var purchaseRecordArr = order.purchaseRecords

		var titleArr = []
		for (let i = 0; i < purchaseRecordArr.length; i++) {
			titleArr.push(purchaseRecordArr[i].title)
		}

		var prodDetails = await HackingProduct.findAll({
			where: {
				title: titleArr,
			}
		}).then((data) => {return data})

		for (let i = 0; i < purchaseRecordArr.length; i++) {
			var record = purchaseRecordArr[i]
			var recordTitle = purchaseRecordArr[i].title
			var recordFound = prodDetails.filter(function(item) { return item.title === recordTitle})
			record["dataValues"]["imageFile"] = recordFound[0].imageFile
			record["dataValues"]["price"] = recordFound[0].price
		}
		return res.json({order: order})
	})
});

module.exports = router;
