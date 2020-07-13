const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const UserRating = db.define("UserRating", {
	date: {
		type: Sequelize.DATE,
	},
	comment: {
		type: Sequelize.STRING(2000),
	},
	rating: {
		type: Sequelize.FLOAT,
	},
});

module.exports = UserRating;
