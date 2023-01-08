const mongoose = require('mongoose');


mongoose.set('strictQuery', true);


const db = process.env.DATABASE


mongoose.connect(db,{              //* <-- Yah hai MongoDB Atlas mein connect Karne Ka Tarika
   useNewUrlParser: true,
   useCreateIndex:true,
   useUnifiedTopology: true,
   useFindAndModify : false
}).then(()=>{
    console.log('MongoDB Atlas connection successfully.')


   
}).catch((err)=>{
     console.log("MongoDB Atlas connection failed:"+ err);
})