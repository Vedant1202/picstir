const httpStatus = require('http-status');
const { Like } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a like
 * @param {Object} likeBody
 * @returns {Promise<Like>}
 */
const createLike = async (likeBody) => {
  const like = await Like.create(likeBody);
  return like;
};

/**
 * Query for likes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLikes = async (filter, options) => {
  const likes = await Like.paginate(filter, { ...options });
  return likes;
};

/**
 * Get like by id
 * @param {ObjectId} postId
 * @param {ObjectId} userId
 * @returns {Promise<Like>}
 */
const getLikeById = async (postId, userId) => {
  return Like.findOne({ postId, userId });
};

/**
 * Delete like by id
 * @param {ObjectId} postId
 * @param {ObjectId} userId
 * @returns {Promise<Like>}
 */
const deleteLike = async (postId, userId) => {
  const like = await getLikeById(postId, userId);
  if (!like) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Like not found');
  }
  await like.remove();
  return like;
};

module.exports = {
  createLike,
  queryLikes,
  deleteLike,
};
