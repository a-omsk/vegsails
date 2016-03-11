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

    getMarkersByCity (city, populate, distance) {
        return new Promise((resolve, reject) => {
            const markers = populate ? this.find({ city }).populate(populate) : this.find({city});

            markers.exec((err, markers) => {
                if (err) {
                    return reject(err);
                }

                if (distance) {
                    const latitude = parseFloat(distance.lat);
                    const longitude = parseFloat(distance.lng);
                    markers = DistanceCalculator(markers, {latitude, longitude});
                }

                return resolve(markers);
            });
        });
    },

    createNew(lat, lng, city) {
        return new Promise((resolve, reject) => {
            if (lat && lng && city) {
                this.create({lat, lng, city}).exec((err, marker) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(marker);
                    }
                });
            } else {
                reject('required params missed')
            }
        })
    },

    getFullMarker(id) {
        return new Promise((resolve, reject) => {
            if (id) {
                this.find({ id }).populate('locations').exec((err, marker) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(marker);
                });
            } else {
                reject('missed ID');
            }
        })
    }
};



