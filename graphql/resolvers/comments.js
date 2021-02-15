const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Post');


module.exports = {
  Mutation: {
    // creates a comment
    createComment: async (_, { postId, body }, context) => {
      // checks the user is logged in 
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        });
      }

      // gets the post from db by id
      const post = await Post.findById(postId);

      // checks post exists
      if (post) {
        // removes the post from db
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
    // deletes user comment
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      // should make this into a function
      const post = await Post.findById(postId);

      // checks post exists
      if (post) {
        // finds the comment that matchs comment id on the post
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        // checks the user that created it is trying to delete it
        if (post.comments[commentIndex].username === username) {
          // removes comment using index
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
};