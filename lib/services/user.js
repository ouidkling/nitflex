'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Encrypt = require('../modules/encrypt');
const Jwt = require('@hapi/jwt');
const MailBody = require('../utils/mail-body');

module.exports = class UserService extends Service {
	getAll() {
		const { User } = this.server.models();

		return User.query();
	}

	getUser(user_id) {
		const { User } = this.server.models();

		return User.query()
			.where({ id: user_id })
			.first()
			.throwIfNotFound()
			.catch((err) => {
				throw Boom.conflict(err.message);
			});
	}

	async create(user) {
		const { User } = this.server.models();
		const { mailerService } = this.server.services();

		user.password = Encrypt.rsaSha256(user.password);

		try {
			const newUser = await User.query().insertAndFetch(user);

			mailerService.sendMail({
				to: `${newUser.firstName} ${newUser.lastName.toUpperCase()} <${newUser.email}>`,
				subject: 'Welcome to NITFLEX',
				text: MailBody.text(newUser.username),
				html: MailBody.html(newUser.username),
			});

			return newUser;
		} catch (err) {
			throw Boom.conflict(err.message);
		}
	}

	login(user) {
		const { User } = this.server.models();

		return User.query()
			.where({ email: user.email })
			.first()
			.then((queryUser) => {
				if (!queryUser) {
					throw Boom.notFound('user not found');
				}

				if (
					Encrypt.compareRsaSha256(user.password, queryUser.password)
				) {
					const token = Jwt.token.generate(
						{
							aud: 'urn:audience:iut',
							iss: 'urn:issuer:iut',
							id: queryUser.id,
							firstName: queryUser.firstName,
							lastName: queryUser.lastName,
							email: queryUser.email,
							scope: queryUser.scope,
						},
						{
							key: 'random_string',
							algorithm: 'HS512',
						}
					);
					return {
						login: 'successful',
						token: 'Bearer ' + token,
					};
				}

				throw Boom.unauthorized('invalid credentials');
			});
	}

	update(user_id, user) {
		const { User } = this.server.models();

		if (user.password) user.password = Encrypt.rsaSha256(user.password);

		return User.query()
			.where({ id: user_id })
			.throwIfNotFound()
			.update(user)
			.catch((err) => {
				throw Boom.conflict(err.message);
			});
	}

	delete(user_id) {
		const { User } = this.server.models();

		return User.query()
			.where({ id: user_id })
			.throwIfNotFound()
			.del()
			.then(() => {
				return '';
			})
			.catch((err) => {
				throw Boom.conflict(err.message);
			});
	}
};
