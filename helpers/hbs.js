const moment = require('moment');

const logicalOperation = {
	equal: (arg1, arg2) => {
		return arg1 === arg2;
	},
	multiply: (arg1, arg2) => {
		return arg1 * arg2;
	},
	noEqual: (arg1) => {
		if (arg1 !== null) {
			return true;
		}
	},
	imageUrl: function (string, ind) {
        return JSON.parse(string)[ind];
	},
	formatDate: function(date, targetFormat){
        return moment(date).format(targetFormat);
	},
	subtract: (arg1, arg2) => {
		return arg1 - arg2;
	},
};

module.exports = logicalOperation;
