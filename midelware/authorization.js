const jwt=require('jsonwebtoken');
const User=require('../models/user');

  exports.authenticate= (req, res, next)=>{
   try{
   const token=req.header('Authorizan');
   const decodeToken=(jwt.verify(token,process.env.JWT_Token))
   User.findByPk(decodeToken.userId).then(user=>{
    req.user=user;
   next()
   }).catch(err=>{throw new Error(err)})
} 
   catch(err){
    console.log(err)
    return res.status(401).json({success:false})
   }
}

exports.checkPremium=async (req, res)=>{
   try{
      const token=req.header('Authorizan');
      const decodeToken=(jwt.verify(token,process.env.JWT_Token))
    const user=await User.findAll({
      where:{id:decodeToken.userId},
      attributes: ['ispremiumuser']
   }
      )
   console.log("premimum",user[0].ispremiumuser)
   res.send(user)
   } 
      catch(err){
       console.log(err)
       return res.status(303).json({success:false})
      }
}
