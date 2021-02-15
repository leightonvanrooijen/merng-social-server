const { AuthenticationError, UserInputError } = require("apollo-server");
const { argsToArgsConfig } = require("graphql/type/definition");

const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

// Post resolvers, this is used to query the database
module.exports = {
  Query: {
    async getPosts() {
      try {
        // Gets all the posts then sorts then by created last (decending = -1)
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    // Gets post based on Id - not used - if I had a single post page
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  // This creates a new post in the database
  // Mutation used for writing to the database
  Mutation: {
    // creates a post
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      // this would be used to tell user that x has posted a new post
      context.pubsub.publish('NEW_POST', {
        newPost: post
      });

      return post;
    },
    // deletes a post
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        // Checks the user was the one who created that post
        if (user.username === post.username) {
          await post.delete();

          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // if the post is already liked then unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // if the post is not liked then like the post
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }

        await post.save();
        return post;

        // if the post isn't found throw error
      } else throw new UserInputError('Post not found');
    },
  },
  // subscribes to a new post - notification system
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
};
