const Sib=require('sib-api-v3-sdk')
const User=require('../models/user');
require('dotenv').config();
Sib.ApiClient.instance.authentications['api-key'].apiKey =process.env.API_KEY
const tranEmailApi=new Sib.TransactionalEmailsApi()



exports.sendmail=async (req, res)=>{
    const email=req.body.email;
    //console.log(email)
    console.log(email)
    try{
        const user=await User.findAll({where:{email}})
        console.log( 'This s a console for user',user)
        if(user.length==0){
            console.log('working')
            return res.status(201).json({ message: 'User not found'});
        }
        const sender={
            email:'admin.and@gmail.com'
        }
        const receiver=[
            {
                email:user[0].email
            }
        ]
     const sendemail=await tranEmailApi.sendTransacEmail({
                sender,
                to:receiver,
                subject:'Reset the password',
                textContent:`your password is ${user[0].password}`
            })
     res.status(200).send({message:'check your mail'})

    }

    catch(err){
        res.status(404).send({message:'goten error'})
        console.log(err)
    }
}