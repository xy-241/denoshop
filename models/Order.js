const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Order = db.define("order", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    chargeId: {
        type: Sequelize.STRING,
    },
    paypalId: {
        type: Sequelize.STRING,
    },
    deliveryDate: {
        type: Sequelize.DATEONLY,
    },
    deliveryTime: {
        type: Sequelize.STRING,
    },
    orderDescription: {
        type: Sequelize.STRING,
    },
    orderStatus: {
        type: Sequelize.INTEGER,
    },
    orderSum: {
        type: Sequelize.FLOAT,
    },
    orderDate: {
        type: Sequelize.DATEONLY,
    },
    discount: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    }
})

module.exports = Order;