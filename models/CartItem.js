const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const CartItem = db.define("cartItem", {
	price: {
		type: Sequelize.FLOAT,
	},
	imageFile: {
		type: Sequelize.STRING,
	},
	dateAdded: {
		type: Sequelize.DATE,
	},
	title: {
		type: Sequelize.STRING,
	},
	itemNum: {
		type: Sequelize.INTEGER,
	},
});

module.exports = CartItem;
