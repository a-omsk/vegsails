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
        const { lat, lng } = req.query;
        const { city } = req.params;

        Marker.getMarkersByCity(city, 'locations', { lat, lng })
            .then(markers => {
                return res.json(MarkerService.toLocations(markers))
            })
            .catch(error => res.negotiate(error));
    }
};
