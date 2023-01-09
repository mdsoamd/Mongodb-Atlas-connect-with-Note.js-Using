const express = require('express');
const router = express.Router();

router.get('/',(req,resp)=>{
    resp.send({message:"Api is Work router.js"})
});

router.post('/register',(req,resp)=>{
    console.log(req.body);
    resp.json({message:req.body});
})


module.exports = router;