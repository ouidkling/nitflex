'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {
	async getAll(request) {
		const { Favorite, Movie } = this.server.models();

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

	async add(request) {
		const { Favorite, Movie } = this.server.models();

		try {
			const userId = request.auth.credentials.id;
			const movieId = request.params.movie_id;

			const favorite = await Favorite.query().insert({
				user_id: userId,
				movie_id: movieId,
			});

			return await Movie.query().findById(favorite.movie_id);
		} catch (err) {
			throw Boom.conflict(err.message);
		}
	}

	async remove(request) {
		const { Favorite } = this.server.models();

		try {
			const userId = request.auth.credentials.id;
			const movieId = request.params.movie_id;

			return await Favorite.query()
				.where({
					user_id: userId,
					movie_id: movieId,
				})
				.first()
				.throwIfNotFound()
				.del()
				.then(() => {
					return '';
				});
		} catch (err) {
			throw Boom.conflict(err.message);
		}
	}
};
