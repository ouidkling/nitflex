'use strict';

const { jsonToCsv } = require('../utils/csv');
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
		const { messageBrokerService } = this.server.services();

		try {
			const newMovie = await Movie.query().insertAndFetch(movie);

			const users = await User.query();
			users.forEach((user) => {
				messageBrokerService.sendMailToQueue({
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
		const { Movie, User } = this.server.models();
		const { messageBrokerService } = this.server.services();

		try {
			const updatedMovie = await Movie.query()
				.patchAndFetchById(movie_id, movie)
				.throwIfNotFound();

			// users that have movie in favorites
			const users = await User.query()
				.join('favorite', 'id', 'user_id')
				.where('movie_id', movie_id);

			users.forEach((user) => {
				messageBrokerService.sendMailToQueue({
					to: `${user.firstName} ${user.lastName.toUpperCase()} <${user.email}>`,
					subject: 'A favorite movie has been updated!',
					text: MailBody.updatedMovieText(user.username, movie.title),
					html: MailBody.updatedMovieHtml(user.username, movie.title),
				});
			});

			return updatedMovie;
		} catch (err) {
			throw Boom.conflict(err.message);
		}
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

	async export(request) {
		const { Movie, User } = this.server.models();
		const { messageBrokerService } = this.server.services();

		try {
			const movies = await Movie.query();
			const csv = jsonToCsv(movies);

			const user_id = request.auth.credentials.id;
			const user = await User.query().findById(user_id).throwIfNotFound();

			await messageBrokerService.sendMailToQueue({
				to: `${user.firstName} ${user.lastName.toUpperCase()} <${user.email}>`,
				subject: 'CSV movie list',
				text: MailBody.exportMoviesText(user.username),
				html: MailBody.exportMoviesHtml(user.username),
				attachments: [
					{
						filename: 'movies.csv',
						content: csv,
					},
				],
			});

			return '';
		} catch (err) {
			throw Boom.conflict(err.message);
		}
	}
};
