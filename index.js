require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./utils/database')
const {StatusCodes} = require('http-status-codes');
const auth = require('./middlewares/auth');
const {API_PORT} = process.env;

connectToDatabase().catch((err)=>{
    console.log(err);
});

const app = express();
app.use(express.json());

const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/notes');

app.use(cors({ origin: '*' }));
app.use('/user',userRoutes);
app.use('/note',noteRoutes);

app.get('/',(req,res,next)=>{
    res.status(StatusCodes.OK).send({
        message: "Welcome to the Website",
    });
})

app.listen(API_PORT,()=>{
    console.log(`App is listening on port ${API_PORT}.`);
});
