const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const DeliveryInfo = db.define("deliveryInfo", {
	country: {
		type: Sequelize.STRING,
	},
	city: {
		type: Sequelize.STRING,
	},
	street: {
		type: Sequelize.STRING,
	},
	houseNo: {
		type: Sequelize.STRING,
	},
	postcode: {
		type: Sequelize.INTEGER,
	},
});

module.exports = DeliveryInfo;
