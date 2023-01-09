const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});   //* config.env file ke liye sirf Kis Ko Ek Bar dekhna 

require('./db/connect');   //* <-- yah hai db connect access Karne Ka Tarika

const User = require('./model/userSchema');  //* <-- yah hai user scheme import & access Karne Ka Tarika

const PORT = process.env.PORT || 3000   //* <-- Aur config.env file ko variable access karne ke liye sirf yah likhna  hai


app.get('/',(req,resp)=>{
      resp.send({message:"Api is Work"})
});









app.listen(PORT,()=>{
    console.log(`Server Running at http://localhost:${PORT}`);
});