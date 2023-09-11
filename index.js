const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const { connect } = require('./Connection/connect');

const classifiedRoutes = require('./routes/classified');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin:"*"
}));
app.use(express.json());

app.use('/classifieds', classifiedRoutes);

app.listen(PORT, async() => {
    try{
        await connect;
        console.log('connected to mongoDb ......')
    }catch(err){
        console.log(err);
        console.log('error while connecting.......')
    }
  console.log(`Server is running on port ${PORT}`);
});
