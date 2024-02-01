'use strict';

const Joi = require('joi');

module.exports = {
    method: 'delete',
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

            return await userService.delete(request.params.id);
        }
    }
};
