/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const updateRating = (id, callback) => {
    Location.calculateRating(id).then((newRating) => {
        return Location.updateRating(id, newRating)
    }).then(() => callback()).catch(callback);
};

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
    },

    afterCreate({ locationId }, callback) {
        updateRating(locationId, callback);
    },

    afterDestroy({ locationId }, callback) {
        updateRating(locationId, callback);
    },

    getByLocation(id) {
        return new Promise((resolve, reject) => {

            Location.findOne({ id }).populate('comments').exec((err, { comments }) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(comments);
                }
            });
        });
    },

    createNew(commentBody) {
        return new Promise((resolve, reject) => {
            this.create(commentBody).exec((err, comment) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(comment);
                }
            });
        });
    }
};

