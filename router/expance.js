const express=require('express');
const expanceControler=require('../controler/expance')
const userautenticat=require('../midelware/authorization')
const purcase=require('../controler/purchase')
const rout=express.Router()

const prem=require('../controler/premium')
rout.get('/allExpance',userautenticat.authenticate,expanceControler.getData)
rout.post('/addExpance',userautenticat.authenticate, expanceControler.addExpance)
rout.delete('/deleteExp/:id',userautenticat.authenticate,expanceControler.removeExpance)
rout.get('/premium',userautenticat.authenticate,purcase.premiumParchase)
rout.post('/updatetransastion',userautenticat.authenticate,purcase.updatrastionStatus)
rout.get('/leaderbord',prem.groupBydata)
module.exports=rout;