'use strict';

const { Service } = require('@hapipal/schmervice');
const bcrypt = require('bcrypt');

module.exports = class UserService extends Service {
    getAll() {

        const { User } = this.server.models();

        return User.query();
    }

    create(user) {

        const { User } = this.server.models();

        const saltRounds = 10;
        user.password = bcrypt.hash(user.password, saltRounds).catch(console.error);

        return User.query().insertAndFetch(user);
    }

    login(user) {

        const { User } = this.server.models();

        return User.query().where({ mail: user.mail.lowercase() }).first()
            .then((queryUser) => {

                if (!queryUser) {
                    return { message: 'user not found' };
                }
 
                return bcrypt.compare(user.password, queryUser.hashed_password)
                    .then((result) => {

                        if (!result) {
                            return result.status(401).message('unauthorized');
                        }

                        return result.ok().message('successful');
                    });
            })
            .catch(console.error);
    }

    delete(user_id) {

        const { User } = this.server.models();

        return User.query().where({ id: user_id }).del()
            .then('')
            .catch(console.error);
    }
};

