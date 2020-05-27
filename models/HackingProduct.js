const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const HackingProduct = db.define("hackingProduct", {
	price: {
		type: Sequelize.FLOAT,
	},
	dateAdded: {
		type: Sequelize.DATE,
	},
	title: {
		type: Sequelize.STRING,
	},
	description: {
		type: Sequelize.STRING(2000),
	},
	category: {
		type: Sequelize.STRING,
	},
	itemNum: {
		type: Sequelize.INTEGER,
	},
});

module.exports = HackingProduct;
