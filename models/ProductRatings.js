const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const ProductRatings = db.define("ProductRatings", {
	year: {
        type: Sequelize.INTEGER,
	},
    jan: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    feb: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    mar: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    apr: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    may: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    jun: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    jul: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    aug: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    sep: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    oct: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    nov: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    dec: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
});

module.exports = ProductRatings;