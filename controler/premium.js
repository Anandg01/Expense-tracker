const Expance=require('../models/expance')
const User=require('../models/user');
const sequelize = require('../util/database');
let total=0;
let arr=[];
/*
exports.groupBydata = async (req, res) => {
    const allUserExpa=[]
    try {
     const users=await User.findAll({
        attributes:['id','name',[sequelize.fn('sum',sequelize.col('expances.expAmount')),'totalcast']],
        include:[{model:Expance, attributes:[]}],
        group:['User.id']
      })

 const expances=await Expance.findAll({
  attributes:['userId',[sequelize.fn('sum',sequelize.col('Expance.expAmount')),'totalcast']],
  group: ['userId']
 })
 users.sort((a, b) => b.dataValues.totalcast - a.dataValues.totalcast);

  res.json(users)
   } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  
  */

  exports.groupBydata=async(req, res)=>{
     try{
      const users=await User.findAll({attributes:['name','totalexpance']})
      users.sort((a, b) => b.dataValues.totalexpance - a.dataValues.totalexpance);
      res.json(users)
     }
     catch(err){
      console.error(err);
      res.status(500).send(err);
     }
   
  }
 