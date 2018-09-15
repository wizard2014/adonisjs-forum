'use strict';

const Schema = use('Schema');

class AddFulltextToPostsSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      this.raw("ALTER TABLE posts ADD FULLTEXT (`title`, `body`)");
    })
  }

  down () {
    this.table('posts', (table) => {
      this.raw("ALTER TABLE posts DROP FULLTEXT (`title`, `body`)");
    })
  }
}

module.exports = AddFulltextToPostsSchema;
