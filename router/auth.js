const express = require('express');
const router = express.Router();

require('../db/connect');   //* <-- yah hai db connect import & access Karne Ka Tarika

const User = require('../model/userSchema');     //* <-- yah hai user scheme import & access Karne Ka Tarika


router.get('/',(req,resp)=>{
      resp.send("Api is Work Server router.js");
});




router.get('/getData',async(req,resp)=>{         //* <-- User data get
    const userdata = await User.find();
    resp.json(userdata)
});



router.post('/register',(req,resp)=>{

   const {name,email,phone,work,password,cpassword} = req.body
   if(!name || !email || !phone || !work || !password || !cpassword){
     return resp.status(422).json({error:"Please filled the field properly"});    //* <-- User Agar Ek bhi field film nahin kiya hai To Yahi se return ho jaega
   }

   User.findOne({email:email})
   .then((userExist)=>{
      if(userExist){
        return resp.status(422).json({error:"Email already Exist"});    //* <-- MongoDB Atlas ka User Database mein Pahle Se maujood Hai To Yahi se return ho jaega
    }
    
    const user = new User({name,email,phone,work,password,cpassword});    //* <-- Yah hai MongoDB Atlas ka database mein user ka data add Karne Ka Tarika
     
    user.save().then(()=>{
        resp.status(201).json({message:"user registered sucessfully"});
    }).catch((erro)=> resp.status(500).json({error:"Failed to registered"}));



      
   }).catch((err)=> {console.log(err)});
   
   

})


module.exports = router;