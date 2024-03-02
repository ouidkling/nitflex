'use strict';

module.exports = {
	method: 'get',
	path: '/movies',
	options: {
		auth: false,
		tags: ['api'],
		handler: async (request, h) => {
			const { movieService } = request.services();

			return await movieService.getAll();
		},
	},
};
