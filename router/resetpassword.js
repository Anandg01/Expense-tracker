const express=require('express')
const resstControler=require('../controler/resetpasswor')
const rout=express.Router();

rout.post('/forgetpassword',resstControler.forgotpassword)
rout.use('/resetpassword/:id',resstControler.resetpassword)
rout.get('/updatepassword/:resetpasswordid',resstControler.updatepassword)

module.exports=rout;