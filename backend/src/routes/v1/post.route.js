const express = require('express');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const postValidation = require('../../validations/post.validation');
const postController = require('../../controllers/post.controller');
const fileUploadController = require('../../controllers/file-upload.controller');

const router = express.Router();

const uploadFile = (req, res, next) => {
  const upload = multer({ storage: fileUploadController.postStorage }).single('postImage');

  upload(req, res, function (err) {
    if (err) {
      return err;
    }
    next();
  });
};

router
  .route('/')
  .post(auth('managePosts'), uploadFile, postController.createPost)
  .get(auth('getPosts'), validate(postValidation.getPosts), postController.getPosts);

router
  .route('/:postId')
  .get(auth('getPosts'), validate(postValidation.getPost), postController.getPost)
  .patch(auth('managePosts'), validate(postValidation.updatePost), postController.updatePost)
  .delete(auth('managePosts'), validate(postValidation.deletePost), postController.deletePost);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management and retrieval
 */

/**
 * @swagger
 * path:
 *  /posts:
 *    post:
 *      summary: Create a post
 *      description: All users can create other posts.
 *      tags: [Posts]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - bio
 *                - imageUrl
 *                - postedBy
 *              properties:
 *                bio:
 *                  type: string
 *                imageUrl:
 *                  type: string
 *                postedBy:
 *                  type: string
 *                  description: User ID of post creator
 *              example:
 *                bio: Sample Post
 *                imageUrl: http://localhost:4000/files/sample-picture.jpg
 *                postedBy: '13nkadsnj12j33j1ioasdkl'
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Post'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all posts
 *      description: Only admins can retrieve all posts.
 *      tags: [Posts]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of posts
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Post'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /posts/{id}:
 *    get:
 *      summary: Get a post
 *      description: Logged in posts can fetch only their own post information. Only admins can fetch other posts.
 *      tags: [Posts]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Post id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Post'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a post
 *      description: Logged in users can only update their own posts. Only admins can update other posts.
 *      tags: [Posts]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Post id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - bio
 *                - imageUrl
 *                - postedBy
 *              properties:
 *                bio:
 *                  type: string
 *                imageUrl:
 *                  type: string
 *                postedBy:
 *                  type: string
 *                  description: User ID of post creator
 *              example:
 *                bio: Sample Post
 *                imageUrl: http://localhost:4000/files/sample-picture.jpg
 *                postedBy: '13nkadsnj12j33j1ioasdkl'
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Post'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a post
 *      description: Logged in users can delete only thier posts. Only admins can delete other posts.
 *      tags: [Posts]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Post id
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
