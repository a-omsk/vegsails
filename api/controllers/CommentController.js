/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createComment(req, res) {
        return res.send('comment saved');
    },

    getComments(req, res) {
        return res.send('comments here');
    }
};

