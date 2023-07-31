const express=require('express');
const expanceControler=require('../controller/expence')
const userautenticat=require('../midelware/authorization')
const purcase=require('../controller/purchase')
const rout=express.Router()

rout.get('/allExpance',userautenticat.authenticate,expanceControler.getData)
rout.post('/addExpance',userautenticat.authenticate, expanceControler.addExpance)
rout.delete('/deleteExp/:id',userautenticat.authenticate,expanceControler.removeExpance)
rout.get('/premium',userautenticat.authenticate,purcase.premiumParchase)
rout.post('/updatetransastion',userautenticat.authenticate,purcase.updatrastionStatus)
rout.get('/download',userautenticat.authenticate,expanceControler.download)
rout.get('/allFileurl',userautenticat.authenticate,expanceControler.allFileurl)
//checkin and creating pagination
rout.use('/paginatio',expanceControler.alldata)
module.exports=rout;