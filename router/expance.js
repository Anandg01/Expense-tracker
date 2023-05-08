const express=require('express');
const expanceControler=require('../controler/expance')
const rout=express.Router()

rout.get('/allExpance',expanceControler.getData)
rout.post('/addExpance',expanceControler.addExpance)

module.exports=rout;