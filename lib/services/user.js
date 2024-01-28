'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {
    getAll() {

        const { User } = this.server.models();

        return User.query();
    }

    create(user) {

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
    }

    delete(user_id) {

        const { User } = this.server.models();

        return User.query().where({ id: user_id }).del()
            .then('')
            .catch(console.error);
    }
};

