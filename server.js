const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});   //* <-- config.env file ke liye sirf Kis Ko Ek Bar define karna hai 

require('./db/connect');   //* <-- yah hai db connect access Karne Ka Tarika

app.use(express.json());  //* <-- Middelware

const User = require('./model/userSchema');  //* <-- yah hai user scheme import & access Karne Ka Tarika

//* Middelware
app.use(require('./router/auth'));       //* <-- we link the router files to make our route easy

const PORT = process.env.PORT || 3000    //* <-- Aur config.env file ko variable access karne ke liye sirf yah likhna  hai


// app.get('/',(req,resp)=>{
//       resp.send({message:"Api is Work Server.js"})
// });









app.listen(PORT,()=>{
    console.log(`Server Running at http://localhost:${PORT}`);
});