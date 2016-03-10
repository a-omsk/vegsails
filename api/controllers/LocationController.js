/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  createLocation(req, res) {
    const locationRequest = Object.assign({}, req.body);

    if (locationRequest.markerId) {

      Location.create(locationRequest).exec((err, location) => {
        res.json(location);
      });

    } else {

      const {lat, lng, city} = locationRequest;

      Marker.create({lat, lng, city}).exec((err, marker) => {
        locationRequest.markerId = marker.id;

        Location.create(locationRequest).exec((err, location) => {
          if (err) {
            res.send(err);
          } else {
            res.json(location);
          }
        });
      });
    }
  },

  getLocationsByCity(req, res) {
    Marker.find({city: req.params.city}).populate('locations').exec((err, markers) => {
      if (err) {
        return res.negotiate(err);
      }

      const locations = _.chain(markers)
        .map(({ locations }) => locations)
        .flatten()
        .value();

      return res.send(locations);

    });
  }
};
