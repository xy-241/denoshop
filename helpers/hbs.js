const logicalOperation = {
	equal: (arg1, arg2) => {
		return arg1 === arg2;
	},
	noEqual: (arg1) => {
		if (arg1 !== null) {
			return true;
		}
	},
};

module.exports = logicalOperation;
