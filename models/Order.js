const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Order = db.define("order", {
    chargeId: {
        type: Sequelize.STRING,
    },
    deliveryDate: {
        type: Sequelize.DATE,
    },
    deliveryTime: {
        type: Sequelize.STRING,
    }
})

module.exports = Order;