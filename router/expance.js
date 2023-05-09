const express=require('express');
const expanceControler=require('../controler/expance')
const userautenticat=require('../midelware/authorization')
const rout=express.Router()

rout.get('/allExpance',userautenticat.authenticate,expanceControler.getData)
rout.post('/addExpance',userautenticat.authenticate, expanceControler.addExpance)
rout.delete('/deleteExp/:id',expanceControler.removeExpance)
module.exports=rout;