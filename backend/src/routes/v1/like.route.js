const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const likeValidation = require('../../validations/like.validation');
const likeController = require('../../controllers/like.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('getPosts'), validate(likeValidation.createLike), likeController.createLike)
  .delete(auth('managePosts'), validate(likeValidation.deleteLike), likeController.deleteLike);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Likes management
 */

/**
 * @swagger
 * path:
 *  /likes:
 *    post:
 *      summary: Create a like
 *      description: All users can create likes.
 *      tags: [Likes]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - postId
 *                - userId
 *              properties:
 *                postId:
 *                  type: string
 *                  description: Post ID of post
 *                userId:
 *                  type: string
 *                  description: User ID of like creator
 *              example:
 *                postId: '8de7vadsnj12j33j1ioas21dsg'
 *                userId: '13nkadsnj12j33j1ioasdkl'
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Like'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    delete:
 *      summary: Delete a like
 *      description: Logged in users can delete only their likes. Only admins can delete other posts.
 *      tags: [Likes]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - postId
 *                - userId
 *              properties:
 *                postId:
 *                  type: string
 *                  description: Post ID of post
 *                userId:
 *                  type: string
 *                  description: User ID of liker
 *              example:
 *                postId: '8de7vadsnj12j33j1ioas21dsg'
 *                userId: '13nkadsnj12j33j1ioasdkl'
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
