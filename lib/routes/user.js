'use strict';

const Joi = require('joi');

module.exports = {
    method: 'get',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().example(8).description('Unique ID of the user')
            })
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.getUser(request.params.id);
        }
    }
};
