'use strict';

const crypto = require('crypto');

function rsaSha256(str) {
	const hash = crypto.createHash('RSA-SHA256');
	hash.update(str);
	return hash.digest('hex');
}

function compareRsaSha256(str, hash) {
	const strHash = rsaSha256(str);
	return strHash === hash;
}

module.exports = {
	rsaSha256,
	compareRsaSha256,
};
