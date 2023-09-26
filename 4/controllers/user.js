const Expense = require('../models/user')

exports.getHome = async (req,res,next) =>{
    try{
        await Expense.findAll()
        .then(expense =>{
            res.render('user/home',{
                expenses : expense
            })
        })
    }
    catch(err){
        console.log(err)
        res.redirect('/')
    }
}

exports.postAddExpense = async (req,res,next) => {
    try{
        await Expense.create({
            amount : req.body.amount,
            description : req.body.description,
            category : req.body.category
        })
        console.log("expense added")
        res.redirect('/')
    }
    catch(err){
        console.log(err)
        res.redirect('/')
    }
}

exports.postDelete = async (req,res,next) => {
    try{
        await Expense.destroy({
            where: {
                id: req.body.id
            }
        })
        .then(result =>{
            res.redirect('/')
        })
    }
    catch(err){
        console.log(err)
        res.redirect('/')
    }
}

exports.getEditExpense = async (req,res,next) =>{
    const expenseId = req.params.expenseId

    try{
        await Expense.findByPk(expenseId)
        .then(result =>{
            res.render('user/edit',{
                expense : result
            })
        })
    }
    catch(err){
        console.log(err)
        res.redirect('/')
    }

}

exports.postEditExpense = async (req,res,next) =>{
    try{
        await Expense.update({
            amount : req.body.amount,
            description : req.body.description,
            category : req.body.category
        },
        {
            where : {
                id : req.body.id
            }
        })
        .then(result =>{
            res.redirect('/')
        })
    }
    catch(err){
        console.log(err);
        res.redirect('/')
    }
}