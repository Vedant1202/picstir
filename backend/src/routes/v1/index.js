const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const postsRoute = require('./post.route');
const likesRoute = require('./like.route');
const messagesRoute = require('./message.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/posts', postsRoute);
router.use('/likes', likesRoute);
router.use('/messages', messagesRoute);

module.exports = router;
