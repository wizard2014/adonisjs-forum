'use strict';

const Post = use('App/Models/Post');

class OwnPostController {
  async index ({ view, auth }) {
    const posts = await Post.query()
                            .forIndex()
                            .where('user_id', '=', auth.user.id)
                            .fetch();

    return view.render('index', {
      posts
    });
  }
}

module.exports = OwnPostController;
