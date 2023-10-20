const express = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

const routes = express.Router();

routes.post('/register', userController.postUserRegister);
routes.post('/login',userController.postUserLogin);
routes.get('/details/:id',authMiddleware,userController.getUserDetails);

module.exports = routes;