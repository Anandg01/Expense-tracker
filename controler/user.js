const user=require('../models/user')
const { use } = require('../router/user')

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
        res.json({messsage:'Successfuly new user created'})
    })
    .catch((err)=>{
        console.log('err occurced')
        res.status(303)
        res.send(err)
    })
}

exports.login=async (req, res)=>{
    const loginData=req.body;
try{
    const User= await user.findAll({where:{email:loginData.email}})
    if(User[0].password===loginData.password){
        res.status(201).json({message:"Successful loged in"})
    }
    else{
        res.status(401).json({message:"Password does not matched"})
    }
}
catch(err){
    res.status(404).json({message:"Email does not exits"})
}
}