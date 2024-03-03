'use strict';

module.exports = {
	jsonToCsv(json) {
		const keys = Object.keys(json[0]);
		const csv = json.map((row) => {
			return keys
				.map((key) => {
					return JSON.stringify(row[key]).replace(/"/g, '""');
				})
				.join(',');
		});
		csv.unshift(keys.join(','));
		return csv.join('\r\n');
	},
};
