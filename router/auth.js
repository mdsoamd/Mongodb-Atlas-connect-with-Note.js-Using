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




//* without promise & Async-Await code use 
// router.post('/register',(req,resp)=>{

//    const {name,email,phone,work,password,cpassword} = req.body
//    if(!name || !email || !phone || !work || !password || !cpassword){
//      return resp.status(422).json({error:"Please filled the field properly"});    //* <-- User Agar Ek bhi field film nahin kiya hai To Yahi se return ho jaega
//    }

//    User.findOne({email:email})
//    .then((userExist)=>{
//       if(userExist){
//         return resp.status(422).json({error:"Email already Exist"});    //* <-- MongoDB Atlas ka Users Database mein Pahle Se yah user maujood & Exist Hai To Yahi se return ho jaega
//     }
    
//     const user = new User({name,email,phone,work,password,cpassword});    //* <-- Yah hai MongoDB Atlas ka database mein user ka data add Karne Ka Tarika
     
//     user.save().then(()=>{
//         resp.status(201).json({message:"user registered sucessfully"});
//     }).catch((erro)=> resp.status(500).json({error:"Failed to registered"}));



      
//    }).catch((err)=> {console.log(err)});
   
   

// })





//TODO crate login route
//* promise & Async-Await use  (yah Tarika code Ko Chhota banata hai)
router.post('/register',async(req,resp)=>{

   const {name,email,phone,work,password,cpassword} = req.body
   if(!name || !email || !phone || !work || !password || !cpassword){
     return resp.status(422).json({error:"Please filled the field properly"});    //* <-- User Agar Ek bhi field film nahin kiya hai To Yahi se return ho jaega
   }



   try{


   const userExist = await User.findOne({email:email})

    if(userExist){
        return resp.status(422).json({error:"Email already Exist"});    //* <-- MongoDB Atlas ka Users Database mein Pahle Se yah user maujood & Exist Hai To Yahi se return ho jaega
    }

    const user = new User({name,email,phone,work,password,cpassword});    //* <-- Yah hai MongoDB Atlas ka database mein user ka data add Karne Ka Tarika

     await user.save();

     resp.status(201).json({message:"user registered sucessfully"});
    
    

   } catch(err){
     console.log(err)
   }

   
   
   

});





//TODO crate login route
router.post("/login",async(req,resp)=>{
    

    try{

    const {email,password} = req.body;

    if(!email || !password){
        return resp.status(400).json({error:"Please Filled the data"});
    }

    const userLogin = await User.findOne({email:email});
     
    console.log(userLogin);

    if(!userLogin){
        console.log("no data");
        resp.status(400).json({error:"User error"});
    }else{
        console.log("yes data");
        resp.json({message:"user Signin successfully"});
    }
    
    
      
    }catch(err){
        console.log(err);
    }
    
   
});




module.exports = router;