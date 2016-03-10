/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },

    description: {
      type: 'string',
      required: true
    },

    rating: {
        type: 'float',
        required: true
    },

    address: {
      type: 'string',
      required: true
    },

    specification: {
      type: 'string',
      required: true
    },

    type: {
      type: 'string',
      required: true
    },

    markerId: {
      model: 'marker'
    }
  }
};