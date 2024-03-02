'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class MovieService extends Service {
	getAll() {
		const { Movie } = this.server.models();

		return Movie.query();
	}

	getMovie(movie_id) {
		const { Movie } = this.server.models();

		return Movie.query()
			.where({ id: movie_id })
			.first()
			.throwIfNotFound()
			.catch((err) => {
				throw Boom.conflict(err.message);
			});
	}

	async create(user) {
		const { Movie } = this.server.models();

		return await Movie.query()
			.insertAndFetch(user)
			.catch((err) => {
				throw Boom.conflict(err.message);
			});
	}

	async update(movie_id, movie) {
		const { Movie } = this.server.models();

		return await Movie.query()
			.patchAndFetchById(movie_id, movie)
			.throwIfNotFound()
			.catch((err) => {
				throw Boom.conflict(err.message);
			});
	}

	async delete(movie_id) {
		const { Movie } = this.server.models();

		return await Movie.query()
			.findById(movie_id)
			.delete()
			.throwIfNotFound()
			.catch((err) => {
				throw Boom.conflict(err.message);
			});
	}
};
