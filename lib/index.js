'use strict';

const HauteCouture = require('@hapipal/haute-couture');
const Package = require('../package.json');

exports.plugin = {
	pkg: Package,
	register: async (server, options) => {
		await HauteCouture.compose(server, options);
		const { messageBrokerService } = server.services();
		messageBrokerService
			.consumeEmail()
			.then(() => {
				server.log('info', 'Email consumer started successfully');
			})
			.catch((err) => {
				server.log('error', `Failed to start email consumer: ${err}`);
			});
	},
};
