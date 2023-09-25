const User = require('../models/user')

exports.getHome = (req,res,next) => {
    User.findAll()
    .then(users =>{
        res.render('user/home',{
            users : users
        });
    })
    .catch(err => console.log(err))
}

exports.getAddUser = (req,res,next) => {
    res.render('/user/add-user')
}

exports.postAddUser = (req,res,next) =>{
    console.log(req.body)
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    User.create({
        name: name,
        email: email,
        phone: phone
    })
    .then(result => {
        console.log('User created successfully')
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
}

exports.deleteUser = async (req,res,next) => {
    try{    
        await User.destroy({
            where:{
                id: req.body.id
            }
        })
        res.redirect('/')
    }
    catch (err){
        console.log(err);
        res.redirect('/');
    }
}

exports.getEditUser = (req,res,next) => {
    const userId = req.params.userId
    User.findByPk(userId)
    .then(result => {
        res.render('user/edit-user', {
            user: result
        });
    })
}

exports.postEditUser = async (req,res,next) => {
    try{
        await User.update({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        },{
            where:{
                id: req.body.id
            }
        })
        res.redirect('/');
    }
    catch(err){
        console.log(err)
    }
}