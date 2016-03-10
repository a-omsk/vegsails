/**
 * MarkerController
 *
 * @description :: Server-side logic for managing markers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getMarkersByCity(req, res) {
        Marker.getMarkersByCity(req.params.city)
            .then(markers => res.send(markers))
            .catch(error => res.negotiate(error));
    }
};

