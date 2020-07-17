const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const Code = db.define("promocode",{
    code:{
        type: Sequelize.STRING
    },
    status:{
        type: Sequelize.STRING
    },
    discount:{
        type: Sequelize.FLOAT
    }
})

module.exports = Code;