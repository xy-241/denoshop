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
    deliveryAddressId: {
        type: Sequelize.INTEGER,
    }
})

module.exports = Order;