/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: 'true'
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
            model: 'marker',
            required: true
        },

        userId: {
            model: 'user',
            required: true
        },

        comments: {
            collection: 'comment',
            via: 'locationId'
        }
    },

    createNew(location) {
        return new Promise((resolve, reject) => {
            this.create(location).exec((err, location) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(location);
                }
            });
        });
    },

    updateLocation(id, userId, newLocation) {
        return new Promise((resolve, reject) => {
            this.update({ id, userId }, newLocation).exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    deleteLocation(id, userId) {
        return new Promise((resolve, reject) => {
            this.destroy({ id, userId }).exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    },

    calculateRating(locationId) {
        return new Promise((resolve, reject) => {
            this.findOne({ id: locationId }).populate('comments').exec((err, { comments }) => {
                if (err) {
                    reject(err);
                } else {
                    const totalRating = comments.reduce((sum, { rating }) => sum + rating, 0);
                    const avgRating = Math.ceil((totalRating / comments.length) / 0.5) * 0.5;

                    resolve(avgRating);
                }
            })
        });
    },

    updateRating(id, rating) {
        return new Promise((resolve, reject) => {
            this.update({ id }, {rating}).exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }
};
