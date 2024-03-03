'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const MailBody = require('../utils/mail-body');

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

	async create(movie) {
		const { Movie, User } = this.server.models();
		const { mailerService } = this.server.services();

		try {
			const newMovie = await Movie.query().insertAndFetch(movie);

			const users = await User.query();
			users.forEach((user) => {
				mailerService.sendMail({
					to: `${user.firstName} ${user.lastName.toUpperCase()} <${user.email}>`,
					subject: 'New movie is out!',
					text: MailBody.newMovieText(
						user.username,
						movie.title,
						movie.poster
					),
					html: MailBody.newMovieHtml(
						user.username,
						movie.title,
						movie.poster
					),
				});
			});

			return newMovie;
		} catch (err) {
			throw Boom.conflict(err.message);
		}
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
		const { Movie, Favorite } = this.server.models();

		try {
			const movie = await Movie.query()
				.findById(movie_id)
				.throwIfNotFound();
			await Favorite.query().where({ movie_id }).del();
			await movie.$query().del();
			return '';
		} catch (err) {
			throw Boom.conflict(err.message);
		}
	}
};
