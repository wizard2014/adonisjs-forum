'use strict';

const { validateAll } = use('Validator');
const Post = use('App/Models/Post');

class PostReplyController {
  async store ({ request, response, session, auth, params }) {
    const post = await Post.query()
      .where('slug', '=', params.slug)
      .firstOrFail();

    const { body } = request.all();

    const rules = {
      body: 'required'
    };

    const validation = await validateAll(request.all(), rules);

    if (validation.fails()) {
      session.withErrors(validation.messages())
            .flashAll();

      return response.redirect('back');
    }

    const reply = new Post();

    reply.fill({
      body,
      parent_id: post.id,
      user_id: auth.user.id
    });

    await reply.save();

    return response.redirect('back');
  }
}

module.exports = PostReplyController;
