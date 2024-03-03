'use strict';

module.exports = {
	method: 'get',
	path: '/movies/export',
	options: {
		auth: {
			scope: ['admin'],
		},
		tags: ['api'],
		handler: async (request, h) => {
			const { movieService } = request.services();

			return await movieService.export(request);
		},
	},
};
