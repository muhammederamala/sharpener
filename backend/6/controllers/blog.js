const { redirect } = require('react-router');
const Blog = require('../models/blog');
const Comment = require('../models/comment'); // Import your Comment model


exports.getHome = (req,res,next) =>{
    res.render('blog/home');
}

exports.postAddBlog = async (req,res,next) =>{
    try{    
        await Blog.create({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
        })
    res.redirect('/blogs')
    }
    catch(err){
        console.log(err)
        res.redirect('/')
    }
}

exports.getBlog = async (req, res, next) => {
    try {
      // Find all blogs and include associated comments
      const blogs = await Blog.findAll({
        include: Comment, // Include the Comment model
      });
  
      res.render('blog/blogs', {
        blogs: blogs,
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).send('An error occurred while fetching the blogs.');
    }
};

exports.postAddComment = async (req,res,next) =>{
  try{
    const blogId = req.params.blogId
    await Comment.create({
      content: req.body.commentContent,
      postId: blogId
    })
    res.redirect('/blogs')
  }
  catch(err){
    console.log(err)
    redirect('/blogs')
  }
}

exports.deleteComment = async (req,res,next) => {
  try{
    commentId = req.params.commentId
    await Comment.destroy({
      where:{
        id : commentId
      }
    })
    res.redirect('/blogs')
  }
  catch(err){
    console.log(err)
    redirect('/blogs')
  }
}

exports.deletePost = async (req,res,next) =>{
  try{
    const postId = req.params.postId
    await Blog.destroy({
      where:{
        id: postId
      }
    })
    res.redirect('/blogs')
  }
  catch(err){
    console.log(err)
    redirect('/blogs')
  }
}