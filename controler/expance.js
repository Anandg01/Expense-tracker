const Expance=require('../models/expance')

exports.getData= (req, res)=>{
  const id=req.user.id;
  Expance.findAll({where:{userId:id}})
  .then(data=>{
    res.json(data)
  })
  .catch(err=>console.log(err))
}

function validString(string){
  if(string===undefined||string.length<=0){
    return true;
  }
  return false;
}

exports.addExpance=(req, res)=>{
    let {expAmount,description,catagory,userId}=req.body;
       userId=req.user.id;
       if(expAmount<=0||validString(description)||validString(catagory)){
      return res.status(401).json({message:'Something went wrong',success:false})
       }
    Expance.create({expAmount,description,catagory,userId})
    .then(data=>res.send(data))
    .catch(err=>{
      res.json({success:false})
        console.log('err occured')
    })
}

exports.removeExpance=(req, res)=>{
  const param=req.params
  Expance.findByPk(param.id)
  .then(details=>{
    return details.destroy()
  })
  .then(data=>{
    res.send(data)
    console.log('data deleted')
  })
  .catch(err=>res.send(err))
}