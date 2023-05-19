const Expance=require('../models/expance')
const User=require('../models/user')
const FileUrlTable=require('../models/downloadFileurl')
const sequelize=require('../util/database')
const s3Service=require('../services/s3services')


exports.getData= (req, res)=>{
  const id=req.user.id;
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 5;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  console.log(page, perPage, endIndex)

  Expance.findAll({where:{userId:id}})
  .then(data=>{
    const paginatedExpenses=data.slice(startIndex, endIndex)
    res.json({
      prevPage:page-1,
      currentPage:page,
      nextPage:page+1,
      perPage,
      total: data.length,
      data: paginatedExpenses
    });
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

exports.download= async (req, res)=>{
  const user=req.user;

  try{
  const expance= await user.getExpances()
  const stringExpance=JSON.stringify(expance)
console.log(user.id)
  const userid=user.id;

  const fileName=`Expense${userid}/${new Date()}.txt`;
  const fileURL=await s3Service.uploadToS3(stringExpance,fileName);
  await FileUrlTable.create({fileURL:fileURL,userId:userid})

  res.status(201).json({fileURL,success:true})

  }
  catch(err){
    res.status(401).json({err,success:false})

  }

}


exports.allFileurl= async(req, res)=>{
 const userId=req.user.id;
 const allfile= await FileUrlTable.findAll({where:{userId:userId}})
 res.send(allfile)
}