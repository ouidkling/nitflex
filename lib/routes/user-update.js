'use strict';

const Joi = require('joi');

module.exports = {
    method: 'patch',
    path: '/user/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().example(8).description('Unique ID of the user')
            }),
            payload: Joi.object({
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                username: Joi.string().min(3).lowercase().example('johndoe').description('Username of the user'),
                email: Joi.string().email().lowercase().example('john.doe@example.com').description('Email address of the user'),
                password: Joi.string().min(8).strict().description('Password of the user'),
                scope: Joi.string().valid('admin', 'user').description('Role of the user')
            })
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.update(request.params.id, request.payload);
        }
    }
};
