'use strict';

const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/user/login',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                email: Joi.string().email().required().example('john.doe@example.com').description('Email address of the user'),
                password: Joi.string().required().strict().description('Password of the user')
            })
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.login(request.payload);
        }
    }
};
