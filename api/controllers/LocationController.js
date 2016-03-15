/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createLocation(req, res) {
        const { user: { id: userId } } = req.session;
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
            .then(markers => res.json(MarkerService.toLocations(markers)))
            .catch(error => res.negotiate(error));
    },

    updateLocation(req, res) {
        const { locationId } = req.params;
        const { user: { id: userId } } = req.session;
        const newLocation = Object.assign({}, req.body);

        Location.updateLocation(locationId, userId, newLocation)
            .then(location => res.json(location))
            .catch(error => res.negotiate(error));
    },

    deleteLocation(req, res) {
        const { locationId } = req.params;
        const { user: { id: userId } } = req.session;

        Location.deleteLocation(locationId, userId)
            .then(() => res.ok())
            .catch(error => res.negotiate(error));
    }
};
