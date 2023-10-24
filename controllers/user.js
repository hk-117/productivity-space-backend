const hashPassword = require('../utils/hash');
const User = require('../models/user/user');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {TOKEN_KEY} = process.env;

exports.postUserRegister = (req,res,next) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password = req.body.password;
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
            message: "Your user account is created! Try to Login and Verify Email",
            user : usr
        });
    });
}

exports.postUserLogin = async(req,res,next) => {
    let email = req.body.email;
    let password = req.body.password;
    try{
        const user = await User.findOne({email:email});
        if(!user){
            res.status(StatusCodes.UNAUTHORIZED).send({
                message: "User Not Found"
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
                message: "Logged In Successfully",
                user
            });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).send({
                message: "Wrong Credentials!"
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
            message: "User Not Found"
        });
        return;
    }
    res.status(StatusCodes.OK).send({
        user    
    });
}
