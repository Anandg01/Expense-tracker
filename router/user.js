const express=require('express')
const userControler=require('../controller/user')
const router=express.Router();
router.post("/signUp",userControler.postData)
router.get('/get',userControler.getData)
router.post('/login',userControler.login)
module.exports=router;