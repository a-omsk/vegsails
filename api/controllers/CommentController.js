/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createComment(req, res) {
        const { user: { auth: { id: userId } } } = req.session;
        const { locationId } = req.query;
        const commentBody = Object.assign({ userId, locationId }, req.body);

        Comment.createNew(commentBody)
            .then(comment => res.json(comment))
            .catch(error => res.negotiate(error));
    },

    getComments(req, res) {
        const { locationId } = req.query;

        Comment.getByLocation(locationId)
            .then(location => res.json(location))
            .catch(error => res.negotiate(error));
    }
};

