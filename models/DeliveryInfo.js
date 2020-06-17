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
	unitNo: {
		type: Sequelize.STRING,
	},
	postcode: {
		type: Sequelize.INTEGER,
	},
	state: {
		type: Sequelize.STRING,
	},
	blockNo: {
		type:Sequelize.STRING
	},
	phoneNo: {
		type: Sequelize.INTEGER
	},
	receiverName: {
		type: Sequelize.STRING
	},
	defaultAddr: {
		type: Sequelize.INTEGER
	}
});

module.exports = DeliveryInfo;
