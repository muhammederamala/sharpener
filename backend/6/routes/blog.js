const path = require('path')

const express = require('express')

const router = express.Router()

const blogController = require('../controllers/blog')

router.get('/blogs/new',blogController.getHome)

router.post('/blogs/new',blogController.postAddBlog)

router.get('/',blogController.getBlog)

router.post('/add-comment/:blogId',blogController.postAddComment)

router.post('/delete-comment/:commentId',blogController.deleteComment)

router.post('/delete-post/:postId',blogController.deletePost)

module.exports = router