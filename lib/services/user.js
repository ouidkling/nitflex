'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Encrypt = require('../modules/encrypt');

module.exports = class UserService extends Service {
    getAll() {

        const { User } = this.server.models();

        return User.query();
    }

    create(user) {

        const { User } = this.server.models();

        user.password = Encrypt.rsaSha256(user.password);

        return User.query().insertAndFetch(user);
    }

    login(user) {

        const { User } = this.server.models();

        return User.query().where({ email: user.email }).first()
            .then((queryUser) => {

                if (!queryUser) {
                    throw Boom.notFound('user not found');
                }

                if (Encrypt.compareRsaSha256(user.password, queryUser.password)) {
                    return { login: 'successful' };
                }

                throw Boom.unauthorized('invalid credentials');
            })
            .catch((err) => {
                return {
                    'status': err.output.statusCode,
                    'message': err.message
                };
            });
    }

    update(user_id, user) {

        const { User } = this.server.models();

        user.password = Encrypt.rsaSha256(user.password);

        return User.query().where({ id: user_id }).update(user)
            .catch(console.error);
    }

    delete(user_id) {

        const { User } = this.server.models();

        return User.query().where({ id: user_id }).del()
            .then(() => {
                return '';
            })
            .catch(console.error);
    }
};

