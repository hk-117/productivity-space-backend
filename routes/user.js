const express = require('express');
const userController = require('../controllers/user');

const routes = express.Router();

routes.post('/register', userController.postUserRegister);
routes.post('/login',userController.postUserLogin);

module.exports = routes;