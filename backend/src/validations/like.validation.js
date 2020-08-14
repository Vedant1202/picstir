const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createLike = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    postId: Joi.string().required().custom(objectId),
  }),
};

const deleteLike = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    postId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createLike,
  deleteLike,
};
