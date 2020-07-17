const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const ProductRatings = db.define("ProductRatings", {
	year: {
		type: Sequelize.INTEGER,
	},
    jan: {
        type: Sequelize.FLOAT,
    },
    feb: {
        type: Sequelize.FLOAT,
    },
    mar: {
        type: Sequelize.FLOAT,
    },
    apr: {
        type: Sequelize.FLOAT,
    },
    may: {
        type: Sequelize.FLOAT,
    },
    jun: {
        type: Sequelize.FLOAT,
    },
    jul: {
        type: Sequelize.FLOAT,
    },
    aug: {
        type: Sequelize.FLOAT,
    },
    sep: {
        type: Sequelize.FLOAT,
    },
    oct: {
        type: Sequelize.FLOAT,
    },
    nov: {
        type: Sequelize.FLOAT,
    },
    dec: {
        type: Sequelize.FLOAT,
    },
});

module.exports = ProductRatings;