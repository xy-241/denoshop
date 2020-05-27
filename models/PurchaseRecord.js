const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const PurchaseRecord = db.define("purchaseRecord", {
	title: {
		type: Sequelize.STRING,
	},
	itemNum: {
		type: Sequelize.INTEGER,
	},
	dateAdded: {
		type: Sequelize.DATE,
	},
	review: {
		type: Sequelize.STRING(2000),
	},
	rating: {
		type: Sequelize.FLOAT,
	},
});

module.exports = PurchaseRecord;
