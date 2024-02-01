'use strict';

const { Service } = require('@hapipal/schmervice');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

module.exports = class UserService extends Service {
    getAll() {

        const { User } = this.server.models();

        return User.query();
    }

    create(user) {

        const { User } = this.server.models();

        const saltRounds = 10;
        bcrypt.hash(user.password, saltRounds)
            .then((hash) => {
                user.password = hash;
            });

        return User.query().insertAndFetch(user);
    }

    login(user) {

        const { User } = this.server.models();

        return User.query().where({ email: user.email }).first()
            .then((queryUser) => {

                if (!queryUser) {
                    throw Boom.notFound('user not found');
                }

                return bcrypt.compare(user.password, queryUser.password)
                    .then((result) => {

                        if (!result) {
                            // throw Boom.unauthorized('invalid credentials');
                            throw Boom.unauthorized('foired');
                        }

                        return { login: 'successful' };
                    });
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

