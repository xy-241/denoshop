const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const WishList = db.define("wishlist",{
    title:{
        type: Sequelize.STRING
    },
    imageFile:{
        type: Sequelize.STRING(500)
    },
    // quantity:{
    //     type: Sequelize.INTEGER
    // },
    price: {
        type: Sequelize.FLOAT
    }
})

module.exports = WishList;