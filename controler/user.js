const user=require('../models/user')

exports.getData=(req, res)=>{
    user.findAll()
    .then(data=>{
        res.json(data)
    })
    .catch(()=>console.log(err))
}

exports.postData=(req, res)=>{
    const userDetails=req.body;
    console.log(userDetails)
    user.create(userDetails).then(resopnce=>{
      res.status(201)
        res.send(resopnce)
        
    })
    .catch((err)=>{
        console.log('err occurced')
        res.status(303)
        res.send(err)
    })
}