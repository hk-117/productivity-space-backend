const { StatusCodes } = require('http-status-codes');
const Category = require('../models/note/category');

exports.postCreateCategory = async (req,res,next) => {
    let user = req.user;
    let category = req.body.category;
    let cat = new Category({
        created_by : user.user_id,
        name: category
    });
    await cat.save();
    res.status(StatusCodes.CREATED).send({
        category: cat
    });
}

exports.editCategory = async (req,res,next) => {
    let category = req.body.category;
    let categoryId = req.params.categoryId;
    let cat = await Category.findOneAndUpdate({_id: categoryId, created_by: req.user.user_id},
        {
            name: category
        }, { new : true}
    );

    res.status(StatusCodes.CREATED).send({
        category: cat
    });
}

exports.deleteCategory = async (req,res,next) => {
    let categoryId = req.params.categoryId;
    await Category.findOneAndDelete({_id: categoryId, created_by: req.user.user_id});
    res.status(StatusCodes.OK).send({
        message: "Category Deleted"
    });
}

exports.getAllCategory = async (req,res,next) => {
    let user_id = req.user.user_id;
    let categories = await Category.find({created_by: user_id});
    res.status(StatusCodes.OK).send({
        categories
    });
}

exports.postCreateNote = (req,res,next) => {

}

exports.editNote = (req,res,next) => {

}

exports.deleteNote = (req,res,next) => {

}

exports.getAllNote = (req,res,next) => {

}

exports.getSingleNote = (req,res,next) => {

}