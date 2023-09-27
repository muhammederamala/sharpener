const path = require('path')

const express = require('express')
const bodyParser = require('body-parser');

const app = express()

const Post = require('./models/blog');
const Comment = require('./models/comment');
const sequelize = require('./util/database');
const blogRoutes = require('./routes/blog');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(blogRoutes)

Post.hasMany(Comment, {onDelete: 'CASCADE'});
Comment.belongsTo(Post);

sequelize.sync()
.then(()=>{
    app.listen(3000)
})

