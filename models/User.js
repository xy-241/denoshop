const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const User = db.define("user", {
	username: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	imageFile: {
		type: Sequelize.STRING,
		defaultValue: "https://res.cloudinary.com/dchpyunul/image/upload/v1593146704/denoshop/userProfileImage/default.jpg",
	},
	password: {
		type: Sequelize.STRING,
	},
	phoneNum: {
		type: Sequelize.INTEGER,
	},
	stripeId: {
		type: Sequelize.STRING,
	},
	dateJoined: {
		type: Sequelize.DATE,
	},
	googleId: {
		type: Sequelize.DECIMAL(21,0),
	},
	githubId: {
		type: Sequelize.DECIMAL(21, 0), 
	}
});

module.exports = User;
