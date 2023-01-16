const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



//TODO Create Database collection instance & object
const userSchema = new mongoose.Schema({       //* <-- Yah hai User Schema define Karne Ka Tarika
    
    name:{
       type:String,
       required:true
    },
    email:{
       type:String,
       required:true
    },
    phone:{
       type:Number,
       required:true
    },
    work:{
       type:String,
       required:true
    },
    password:{
       type:String,
       required:true
    },
    
    cpassword:{
       type:String,
       required:true
    },
    tokens:[
       {
         token:{
            type:String,
            required:true
         }
       }
    ]


    
});



//* we are hashing the password or ( yah Hai password hash Karne Ka Tarika )  or ( This package install --> bcrypt)
userSchema.pre('save',async function (next){     //* function Mein fat arrow use karne se this keyboard Kam Nahin karta  (matlab yah arrow =>)
   if(this.isModified('password')){
       this.password = await bcrypt.hash(this.password,12);
       this.cpassword = await bcrypt.hash(this.cpassword,12);
   }
   next();
})



//TODO Create generateAuthToken Function
userSchema.methods.generateAuthToken = async function (){     //* <-- yah Hai User ka token generate karne ka function
    
   try{
      let token = jwt.sign({_id:this._id},process.env.SECRET_KET);
      this.tokens = this.tokens.concat({token:token});
      await this.save();      //* <-- user Token store Database
      return token;
      
   }catch(err){
      console.log(err);
   }
   
}





const User = mongoose.model('USER',userSchema);

module.exports = User;         //* <-- yah hai user scheme exports & bhejne ka Tarika