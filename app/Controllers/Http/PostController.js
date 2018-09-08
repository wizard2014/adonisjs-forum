'use strict';

const { validateAll } = use('Validator');
const Post = use('App/Models/Post');

class PostController {
  create ({ view }) {
    return view.render('posts.create');
  }

  async store ({ request, session, response, auth }) {
    const { title, tag, body } = request.all();

    const rules = {
      title: 'required',
      tag: 'required|exists:tags,id',
      body: 'required'
    };

    const validation = await validateAll(request.all(), rules);

    if (validation.fails()) {
      session.withErrors(validation.messages())
            .flashAll();

      return response.redirect('back');
    }

    const post = new Post();

    post.fill({
      title,
      tag_id: tag,
      user_id: auth.user.id,
      body
    });

    await post.save();

    return response.route('home');
  }
}

module.exports = PostController;
