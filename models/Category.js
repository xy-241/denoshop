const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Category = db.define("categories",{
    id:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true
    },
    category:{
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
    }
})

module.exports = Category;