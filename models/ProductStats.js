const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const ProductStats = db.define("productStats", {
	year: {
		type: Sequelize.INTEGER,
	},
    target: {
        type: Sequelize.INTEGER,
    },
    jan: {
        type: Sequelize.INTEGER,
    },
    feb: {
        type: Sequelize.INTEGER,
    },
    mar: {
        type: Sequelize.INTEGER,
    },
    apr: {
        type: Sequelize.INTEGER,
    },
    may: {
        type: Sequelize.INTEGER,
    },
    jun: {
        type: Sequelize.INTEGER,
    },
    jul: {
        type: Sequelize.INTEGER,
    },
    aug: {
        type: Sequelize.INTEGER,
    },
    sep: {
        type: Sequelize.INTEGER,
    },
    oct: {
        type: Sequelize.INTEGER,
    },
    nov: {
        type: Sequelize.INTEGER,
    },
    dec: {
        type: Sequelize.INTEGER,
    },
});

module.exports = ProductStats;
