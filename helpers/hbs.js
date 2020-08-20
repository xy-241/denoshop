const moment = require('moment');

const logicalOperation = {
	inside: (arg1, arg2) => {
		return JSON.parse(arg2).includes(arg1);
	},
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
		if(string){
			return JSON.parse(string)[ind];
		}
	},
	currency: (arg1) => {
		return arg1.toFixed(2)
	},
	formatDate: function(date, targetFormat){
        return moment(date).format(targetFormat);
	},
	subtract: (arg1, arg2) => {
		return arg1 - arg2;
	},
};

module.exports = logicalOperation;
