'use strict'

const Model = use('Model')

class Post extends Model {
  static boot () {
    super.boot();

    this.addTrait('Slugify');
  }
}

module.exports = Post
