const express = require('express');
const authMiddleWare = require('../middlewares/auth');
const notesController = require('../controllers/notes');

const routes = express.Router();

routes.post('/create', authMiddleWare, notesController.postCreateNote);
routes.delete('/delete/:noteId', authMiddleWare, notesController.deleteNote);
routes.put('/edit/:noteId', authMiddleWare, notesController.editNote);
routes.get('/all',authMiddleWare, notesController.getAllNote);
routes.get('/single/:noteId', authMiddleWare, notesController.getSingleNote);
routes.post('/create-category', authMiddleWare, notesController.postCreateCategory);
routes.put('/edit-category/:categoryId', authMiddleWare, notesController.editCategory);
routes.delete('/delete-category/:categoryId', authMiddleWare, notesController.deleteCategory);
routes.get('/all-category', authMiddleWare, notesController.getAllCategory);

module.exports = routes;