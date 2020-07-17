const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Banner = db.define("banner", {
	imageFile: {
		type: Sequelize.STRING
	},
	dateAdded: {
		type: Sequelize.DATE
	},
	title: {
		type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }
});

module.exports = Banner;