const hashPassword = require('../utils/hash');
const User = require('../models/user/user');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require('dotenv').config();
const {TOKEN_KEY} = process.env;

exports.postUserRegister = async (req,res,next) => {
    let first_name = req.body.first_name.trim();
    let last_name = req.body.last_name.trim();
    let email = req.body.email.trim();
    let password = req.body.password.trim();
    if(first_name && last_name && email && password){
        if(!validator.isEmail(email)){
            return res.status(StatusCodes.UNAUTHORIZED).send({
                message: "INVALID_EMAIL"
            });
        } else {
            const user = await User.findOne({email:email});
            if(user){
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    message: "ALREADY_EXIST"
                });
            }
        }
        if(password.trim().length<8){
            return res.status(StatusCodes.UNAUTHORIZED).send({
                message: "SHORT_PASSWORD"
            });
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            message: "INCOMPLETE_FIELDS"
        });
    }
    hashPassword(password).then(async(password) => {
        let usr = new User({first_name,last_name,email,password});
        const token = jwt.sign({
            user_id: usr._id,
            email
        }, TOKEN_KEY, {
            expiresIn: "24h"
        });
        usr.token = token;
        console.log(usr);
        await usr.save();
        res.status(StatusCodes.CREATED).send({
            message: "ACCOUNT_CREATED",
            user : usr
        });
    });
}

exports.postUserLogin = async(req,res,next) => {
    let email = req.body.email.trim();
    let password = req.body.password;
    try{
        const user = await User.findOne({email:email});
        if(!user){
            res.status(StatusCodes.UNAUTHORIZED).send({
                message: "USER_NOT_FOUND"
            });
            return;
        }
        const match = await bcrypt.compare(password,user.password);
        if(match){
            const token = jwt.sign({
                user_id: user._id,
                email
            }, TOKEN_KEY, {
                expiresIn: "24h"
            });
            user.token = token;
            await user.save();
            res.status(StatusCodes.OK).send({
                message: "LOGIN_SUCCESSFUL",
                user
            });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).send({
                message: "PASSWORD_MISMATCH"
            });
        }
    } catch(e) {
        console.log(e);
    }
}

exports.getUserDetails = async(req,res,next) => {
    let user_id = req.params.id;
    const user = await User.findById(user_id);
    if(!user){
        res.status(StatusCodes.NOT_FOUND).send({
            message: "USER_NOT_FOUND"
        });
        return;
    }
    res.status(StatusCodes.OK).send({
        user    
    });
}
