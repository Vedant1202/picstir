const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { likeService } = require('../services');

const createLike = catchAsync(async (req, res) => {
  const like = await likeService.createLike(req.body);
  res.status(httpStatus.CREATED).send(like);
});

const deleteLike = catchAsync(async (req, res) => {
  await likeService.deleteLike(req.body.postId, req.body.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLike,
  deleteLike,
};
