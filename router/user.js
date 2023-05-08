const express=require('express')
const userControler=require('../controler/user')
const router=express.Router();
router.post("/signUp",userControler.postData)
router.get('/get',userControler.getData)
module.exports=router;