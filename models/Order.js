const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Order = db.define("order", {
    chargeId: {
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
        type: Sequelize.STRING,
    },
    orderSum: {
        type: Sequelize.FLOAT,
    }
})

module.exports = Order;