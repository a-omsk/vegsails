/**
 * Marker.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    lat: {
      type: 'float',
      required: true
    },

    lng: {
      type: 'float',
      required: true
    },

    city: {
      type: 'string',
      required: true
    },

    locations: {
      collection: 'location',
      via: 'markerId'
    }
  },

  getMarkersByCity (city, populate) {
    return new Promise((resolve, reject) => {
      const markers = populate ? Marker.find({city}).populate(populate) :  Marker.find({city});

      markers.exec((err, markers) => {
        if (err) {
          return reject(err);
        }

        return resolve(markers);
      });
    });
  }
};

