const rozerpay=require('razorpay')
const Order=require('../models/orders');
const { json } = require('sequelize');

exports.premiumParchase=async (req, res)=>{
    console.log(req.user.id)
    try{
const rzp=new rozerpay({
    key_id:'rzp_test_8nlK31tkHx2aN1',
    key_secret:'PnbxKTo0cKdK5nFhfPBiHfZf'
})
const amount=5000;
 rzp.orders.create({amount,currency:'INR'},(err,order)=>{
    if(err){
       // console.log('error occcured in first')
        throw new Error(JSON.stringify(err))
    }
    req.user.createOrder({orderId:order.id,status:'PENDING'})
    .then(()=>{
        return res.status(201).json({order,key_id:rzp.key_id})
    })
    .catch(err=>{
        console.log('error in ths 2')
        throw new Error(err)
    })
 })

    }
    catch(err){
       console.log(err)     
        res.status(403).json({message:'Somthing went wrong',error:err})
    }
}

exports.updatrastionStatus=async(req, res)=>{
 try{
  const {payment_id,order_id,paymentStatus}=req.body;
  let status='SUCCESSFUL';
  let premimum=true;
   if(paymentStatus===false){
   status='FAIELD';
   premimum=true
   }
  console.log("paymentStatus===",paymentStatus)
  Order.findOne({where:{orderId:order_id}})
  .then(order=>{
    order.update({paymentId:payment_id,status:status})
    .then(()=>{
        req.user.update({ispremiumuser:premimum}).then(()=>{
            return res.status(202).json({sucess:true, message:'Transastion completed'})
        }).catch(err=>{
            throw new Error(err)
        })
    }).catch(err=>{
        throw new Error(err)
    })
  }).catch(err=>{
    throw new Error(err)
  })
  }
 catch(err){
console.log(err)
res.status(403).json({sucess:false,message:'transtion faield'})
   }
}