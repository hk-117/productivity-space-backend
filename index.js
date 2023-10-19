require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectToDatabase = require('./utils/database')
const User = require('./models/user/user');
const EmailOTP = require('./models/user/emailotp');
const Category = require('./models/note/category');
const Note = require('./models/note/note');
const {API_PORT} = process.env;

connectToDatabase().catch((err)=>{
    console.log(err);
});

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: "Md Zubayer Islam",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: new Date(253402300000000)
    }
}));

app.get('/',(req,res,next)=>{
    res.send('<h1> Welcome to the Website </h1>');
})

app.listen(API_PORT,()=>{
    console.log(`App is listening on port ${API_PORT}.`);
});