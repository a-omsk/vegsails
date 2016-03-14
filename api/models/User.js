/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.user.attributes({
      comments: {
          collection: 'comment',
          via: 'userId'
      }
  }),

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },

  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
