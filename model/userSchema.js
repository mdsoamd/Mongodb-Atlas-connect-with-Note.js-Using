const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    
});

//* we are hashing the password or ( yah Hai password hash Karne Ka Tarika )  or ( This package install --> bcrypt)
userSchema.pre('save',async function (next){     //* function Mein fat arrow use karne se this keyboard Kam Nahin karta  (matlab yah arrow =>)
   if(this.isModified('password')){
       this.password = await bcrypt.hash(this.password,12);
       this.cpassword = await bcrypt.hash(this.cpassword,12);
   }
   next();
})





const User = mongoose.model('USER',userSchema);

module.exports = User;         //* <-- yah hai user scheme exports & bhejne ka Tarika