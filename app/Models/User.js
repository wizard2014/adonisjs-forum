'use strict';

const Hash = use('Hash');
const Model = use('Model');

const md5 = require('md5');

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get computed () {
    return [
      'avatar'
    ];
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  getAvatar ({ email }) {
    return `https://www.gravatar.com/avatar/${md5(email)}?s=100&d=mm`;
  }
}

module.exports = User;
