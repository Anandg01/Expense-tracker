const Expance=require('../models/expance')
const User=require('../models/user')
const sequelize=require('../util/database')

exports.getData= (req, res)=>{
  const id=req.user.id;
  Expance.findAll({where:{userId:id}})
  .then(data=>{
    res.json(data)
  })
  .catch(err=>console.log(err))
}

function validString(string){
  if(string==undefined||string.length===0){
    return true;
  }
  return false;
}

exports.addExpance=async (req, res)=>{
  const t= await sequelize.transaction()

    let {expAmount,description,catagory,userId}=req.body;
       userId=req.user.id;
       if(expAmount==undefined||validString(description)||validString(catagory)){
      return res.status(401).json({message:'Something went wrong',success:false})
       }

       try{
        const data=await Expance.create({expAmount,description,catagory,userId},{transaction:t})
      const totalexpance=Number(req.user.totalexpance)+Number(expAmount)
      console.log(totalexpance)
       await User.update({
        totalexpance:totalexpance
           },{
            where:{id:req.user.id},
            transaction:t
          })
           await t.commit();
       res.send(data)
       }
       catch(err){
        await t.rollback();
        res.status(403).json(err)
        console.log('error find')
       }
  
}

exports.removeExpance=async (req, res)=>{
  const t=await sequelize.transaction();
  const expid=req.params.id
  if(expid==undefined||expid.length===0){
    return res.status(400).json({success:false,message:'invalid id'})
  }
  const userid=req.user.id;
  console.log(userid)
    try{
  const exp= await Expance.findAll({where:{id:expid}},{transaction:t})
  console.log(exp[0].id)
  const totalexpance=Number(req.user.totalexpance)-Number(exp[0].expAmount)
    await exp[0].destroy();
     console.log(totalexpance, req.user.id)
     await User.update({
      totalexpance:totalexpance
         },{
          where:{id:req.user.id},
          transaction:t
        })
         await t.commit();
         res.status(200).send(exp)
    }
    catch(err){
      await t.rollback()
      console.log(err)
      return res.status(404).json({success:false,message:'somthing went wrong'})
    }
}