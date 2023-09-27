const path = require('path')

const express = require('express')

const router = express.Router()

const blogController = require('../controllers/blog')

router.get('/',blogController.getHome)

router.post('/create-blog',blogController.postAddBlog)

router.get('/blogs',blogController.getBlog)

router.post('/add-comment/:blogId',blogController.postAddComment)

router.post('/delete-comment/:commentId',blogController.deleteComment)

router.post('/delete-post/:postId',blogController.deletePost)

module.exports = router