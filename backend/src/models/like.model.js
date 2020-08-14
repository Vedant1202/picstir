const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const likeSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    postId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
likeSchema.plugin(toJSON);
likeSchema.plugin(paginate);

/**
 * @typedef Like
 */
const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
