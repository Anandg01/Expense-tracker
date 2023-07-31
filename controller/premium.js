const Expance=require('../models/expence')
const User=require('../models/user');
const { Op } = require("sequelize");

  exports.groupBydata=async(req, res)=>{
     try{
      console.log(req.user.name)
      const users=await User.findAll({attributes:['name','totalexpences']})
      users.sort((a, b) => b.dataValues.totalexpences - a.dataValues.totalexpences);
      res.json(users)
     }
     catch(err){
      console.error(err);
      res.status(500).send(err);
     }
  }
  exports.dalyExpences=async (req, res)=>{
   const date=req.params;
   const id=req.user.id;
   // if(!req.user.ispremiumuser){
   //  return  res.status(202).json({success:false,message:"this is only for premium user"})
   // }
   try{
     const expences=await Expance.findAll({where:{
      date:date.date, userId:id
     }})
     res.status(200).json(expences)
   }
   catch(err){
      console.log(err)
   }
  
   console.log(id,date.date);
}

exports.monthlyReport= async(req, res)=>{
  
    const month=req.params.month;
    console.log(month)
    try{
     const expence=await Expance.findAll({
      where: {
         date: {
           [Op.like]: `%-${month}-%`,
         },
         userId: req.user.id,
       },
       raw: true,
     })
     console.log(expence)
     res.status(200).json(expence)
    }
    catch(err){
      res.send(err)
    }
}