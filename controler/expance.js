const Expance=require('../models/expance')

exports.getData= (req, res)=>{
  Expance.findAll()
  .then(data=>{
    res.json(data)
  })
  .catch(err=>console.log(err))
}

exports.addExpance=(req, res)=>{
    const {expAmount,description,catagory}=req.body;
    console.log(expAmount,description)
    Expance.create({expAmount,description,catagory})
    .then(data=>res.send(data))
    .catch(err=>{
        console.log('err occured')
    })
}