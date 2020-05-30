require("dotenv").config();
module.exports = {
	host: process.env.DBHOST,
	database: process.env.DBNAME,
	username: process.env.DBUSER,
	password: process.env.DBPASS,
};
