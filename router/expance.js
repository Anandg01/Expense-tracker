const express=require('express');
const expanceControler=require('../controler/expance')
const userautenticat=require('../midelware/authorization')
const purcase=require('../controler/purchase')
const rout=express.Router()

rout.get('/allExpance',userautenticat.authenticate,expanceControler.getData)
rout.post('/addExpance',userautenticat.authenticate, expanceControler.addExpance)
rout.delete('/deleteExp/:id',expanceControler.removeExpance)
rout.get('/premium',userautenticat.authenticate,purcase.premiumParchase)
rout.post('/updatetransastion',userautenticat.authenticate,purcase.updatrastionStatus)

module.exports=rout;