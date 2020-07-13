const mySQLDB = require("./DBConfig");

// Import all the models
const user = require("../models/User");
const purchaseRecord = require("../models/PurchaseRecord");
const cartItem = require("../models/CartItem");
const hackingProduct = require("../models/HackingProduct");
const deliveryInfo = require("../models/DeliveryInfo");
const chat = require("../models/Chat");
// Import all the models

const setUpDB = (drop) => {
	mySQLDB
		.authenticate()
		.then(() => {
			console.log("Denoshop DB is connected!");
		})
		.then(() => {
			user.hasMany(purchaseRecord); // Define relationship
			user.hasMany(cartItem);
			user.hasMany(deliveryInfo);
			mySQLDB
				.sync({
					// Creates table if none exists
					force: drop,
				})
				.then(() => {
					console.log("Creates tables if none exists");
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log("Error: " + err));
};

module.exports = { setUpDB };
