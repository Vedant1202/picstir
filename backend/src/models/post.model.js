const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    bio: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    postedBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
