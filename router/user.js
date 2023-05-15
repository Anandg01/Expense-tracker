const express=require('express')
const userControler=require('../controler/user')
const fargotconstrol=require('../controler/forgetpassword')
const router=express.Router();
router.post("/signUp",userControler.postData)
router.get('/get',userControler.getData)
router.post('/login',userControler.login)

router.post('/forgetpassword',fargotconstrol.sendmail)
module.exports=router;