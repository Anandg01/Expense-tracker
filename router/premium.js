const express=require('express')
const userAuthenticate=require('../midelware/authorization')
const premiumController=require('../controller/premium')

const rout=express.Router()

rout.get('/dalyreports/:date',userAuthenticate.authenticate,premiumController.dalyExpences)
rout.get('/monthlyReport/:month',userAuthenticate.authenticate,premiumController.monthlyReport)
rout.get('/leaderbord',userAuthenticate.authenticate, premiumController.groupBydata)
rout.get('/checkpremimum',userAuthenticate.checkPremium)

module.exports=rout;