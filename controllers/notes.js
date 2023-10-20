const { StatusCodes } = require('http-status-codes');
const Category = require('../models/note/category');
const Note = require('../models/note/note');

exports.postCreateCategory = async (req,res,next) => {
    let user = req.user;
    let category = req.body.category;
    let cat = new Category({
        created_by : user.user_id,
        name: category
    });
    await cat.save();
    res.status(StatusCodes.CREATED).send(cat);
}

exports.editCategory = async (req,res,next) => {
    let category = req.body.category;
    let categoryId = req.params.categoryId;
    let cat = await Category.findOneAndUpdate({_id: categoryId, created_by: req.user.user_id},
        {
            name: category
        }, { new : true}
    );

    res.status(StatusCodes.CREATED).send(cat);
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
    res.status(StatusCodes.OK).send(categories);
}

exports.postCreateNote = async (req,res,next) => {
    let {title,content,category,created_by} = req.body;
    let note = new Note({title,content,category,created_by});
    await note.save();
    res.status(StatusCodes.CREATED).send(note);
}

exports.editNote = async (req,res,next) => {
    let {title,content} = req.body;
    let noteId = req.params.noteId;
    let note = await Note.findOneAndUpdate({
        _id: noteId,
        created_by: req.user.user_id
    },{title,content,modified_time: Date.now()},{new: true});
    res.status(StatusCodes.CREATED).send(note);
}

exports.deleteNote = async (req,res,next) => {
    let noteId = req.params.noteId;
    await Note.findOneAndDelete({_id: noteId, created_by: req.user.user_id});
    res.status(StatusCodes.OK).send({
        message: "Note Deleted"
    });
}

exports.getAllNote = async (req,res,next) => {
    let notes = await Note.find({created_by: req.user.user_id});
    res.status(StatusCodes.OK).send(notes);
}

exports.getSingleNote = async (req,res,next) => {
    let note = await Note.findOne({_id: req.params.noteId, created_by: req.user.user_id});
    res.status(StatusCodes.OK).send(note);
}