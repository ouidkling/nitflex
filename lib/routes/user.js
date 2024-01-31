'use strict';

const Joi = require('joi');

module.exports = {
    method: 'get',
    path: '/users',
    options: {
        tags: ['api'],
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.getAll();
        }
    }
};

module.exports = {
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                userName: Joi.string().required().min(3).lowercase().example('johndoe').description('Username of the user'),
                mail: Joi.string().email().required().lowercase().example('john.doe@example.com').description('Email address of the user'),
                password: Joi.string().required().min(8).strict().description('Password of the user')
            })
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.create(request.payload);
        }
    }
};

module.exports = {
    method: 'post',
    path: '/user/login',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                mail: Joi.string().email().required().example('john.doe@example.com').description('Email address of the user'),
                password: Joi.string().required().strict().description('Password of the user')
            })
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.login(request.payload);
        }
    }
};

module.exports = {
    method: 'delete ',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().required().example(8).description('Unique ID of the user') })
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.delete(request.payload);
        }
    }
};
