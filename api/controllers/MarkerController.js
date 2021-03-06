/**
 * MarkerController
 *
 * @description :: Server-side logic for managing markers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getMarkersByCity(req, res) {
        const { city } = req.params;

        Marker.getMarkersByCity(city)
            .then(markers => res.send(markers))
            .catch(error => res.negotiate(error));
    },

    getFullMarker(req, res) {
        Marker.getFullMarker(req.params.id)
            .then(marker => res.send(marker))
            .catch(error => res.negotiate(error));
    }
};

