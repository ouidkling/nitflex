'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {
	async getAll(request) {
		const { Favorite } = this.server.models();
		const { Movie } = this.server.models();

		try {
			const userId = request.auth.credentials.id;

			const favorites = await Favorite.query().where({
				user_id: userId,
			});

			return await Promise.all(
				favorites.map(async (favorite) => {
					return await Movie.query().findById(favorite.movie_id);
				})
			);
		} catch (err) {
			throw Boom.conflict(err.message);
		}
	}
};
