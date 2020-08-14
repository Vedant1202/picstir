const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    bio: Joi.string().optional(),
    postedBy: Joi.string().required(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      bio: Joi.string(),
      imageUrl: Joi.string().required().email(),
      postedBy: Joi.string().required(),
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
