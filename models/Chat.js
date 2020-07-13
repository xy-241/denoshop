const Sequelize = require("sequelize");
const db = require("../config/DBConfig");

const User = db.define("chat", {
	RequestTime:{
		type: Sequelize.DATE,
	},
	ClientID :{
		type: Sequelize.INTEGER,
	},
	ClientName: {
		type: Sequelize.STRING,
	},
	ClientEmail: {
		type: Sequelize.STRING,
	},
	ClientPhone: {
		type: Sequelize.STRING,
	},
	RequestDepartment:{
		type: Sequelize.ENUM,
		values: ['Order Status','Product Advice and Enquiries','Warranty','Gift Ideas','Store Enquiries','Others']
	},
	RequestDescription: {
		type: Sequelize.STRING,
	},
	RequestUrgent: {
		type: Sequelize.BOOLEAN,
	},
	StaffName: {
		type: Sequelize.STRING,
	},
	Messages: {
        type: Sequelize.TEXT('long'),
	},
	Ended: {
		type: Sequelize.BOOLEAN,
		defaultValue: 0,
	}
});

module.exports = User;
