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
    },
    limit:{
        type: Sequelize.INTEGER
    },
    use:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

module.exports = Code;