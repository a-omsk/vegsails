/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        userId: {
            model: 'user',
            required: true
        },

        locationId: {
            model: 'location',
            required: true
        },

        rating: {
            type: 'float',
            required: true
        },

        body: {
            type: 'string',
            required: true
        }
    }
};

