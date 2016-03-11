/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createLocation(req, res) {
        const { session: { user: { auth: { id: userId } } } } = req;
        const locationRequest = Object.assign({ userId }, req.body);

        if (locationRequest.markerId) {

            Location.createNew(locationRequest)
                .then(location => res.json(location))
                .catch(error => res.negotiate(error));

        } else {

            const {lat, lng, city} = locationRequest;

            Marker.createNew(lat, lng, city)
                .then(marker => {
                    locationRequest.markerId = marker.id;

                    Location.createNew(locationRequest)
                        .then(location => res.json(location))
                        .catch(error => res.negotiate(error));
                })
                .catch(error => res.negotiate(error));
        }
    },

    getLocationsByCity(req, res) {
        Marker.getMarkersByCity(req.params.city, 'locations')
            .then(markers => {

                const locations = _.chain(markers)
                    .map(({ locations }) => locations)
                    .flatten()
                    .value();

                return res.send(locations);
            })
            .catch(error => res.negotiate(error));
    }
};
