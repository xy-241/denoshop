const mySQLDB = require("./DBConfig");

// Import all the models
const user = require("../models/User");
const purchaseRecord = require("../models/PurchaseRecord");
const cartItem = require("../models/CartItem");
const hackingProduct = require("../models/HackingProduct");
const deliveryInfo = require("../models/DeliveryInfo");
const chat = require("../models/Chat");
const order = require("../models/Order")
// Import all the models
// DB Sync
const category = require("../models/Category");
const banner = require("../models/Banner");
const promodecode = require("../models/PromoCode");
const productStats = require("../models/ProductStats");
const productRating = require("../models/ProductRatings");
const userRating = require("../models/UserRating");

// DB Sync

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
			user.hasMany(order);
			deliveryInfo.hasMany(order);

			// First dbSync
			category.hasMany(hackingProduct);

			// Product-Stats Relation
			hackingProduct.hasMany(productStats);
			productStats.belongsTo(hackingProduct);

			// Product-Rating Relation
			hackingProduct.hasMany(productRating);
			productRating.belongsTo(hackingProduct);

			// Product-UserRating Relation
			hackingProduct.hasMany(userRating);
			userRating.belongsTo(hackingProduct);

			// User-UserRating Relation
			user.hasMany(userRating);
			userRating.belongsTo(user);
			// First dbSync

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
