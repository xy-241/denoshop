const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const ProductStats = db.define("productStats", {
	year: {
		type: Sequelize.INTEGER,
	},
    target: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    jan: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    feb: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    mar: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    apr: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    may: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    jun: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    jul: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    aug: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    sep: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    oct: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    nov: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    dec: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
});

module.exports = ProductStats;