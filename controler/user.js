const user=require('../models/user')
const { use } = require('../router/user')
const jwt = require('jsonwebtoken');

const bcrypt=require('bcrypt')
exports.getData=(req, res)=>{
    user.findAll()
    .then(data=>{
        res.json(data)
    })
    .catch(()=>console.log(err))
}

exports.postData =async (req, res)=>{
    const {name, email, password}=req.body;
    console.log('password=', password)
    try{
     const hash= await bcrypt.hash(password,10)
    await user.create({name, email,password:hash,ispremiumuser:false})
    res.status(201).json({ message: 'Successfully created new user' });
     }
    catch(err){
        console.log('err occurced')
        res.status(303).json({ message: 'An error occurred while creating the user' });
    }
}

function generatToken(id){
    return jwt.sign({userId:id},'854215f63ef23342')
  }

exports.login=async (req, res)=>{
    const {email, password}=req.body;
    console.log('password', password)
    let id;
try{
    const User= await user.findAll({where:{email}})
    const hash=User[0].password;
    const token=generatToken(User[0].id)
    const premimum=User[0].ispremiumuser;
    console.log(premimum)
    if(!User){
        return res.status(201).json({ message: 'User not found'});
    }
    const isMatch = await bcrypt.compare(password, hash);
if(!isMatch){
    return res.status(401).json({ message: 'Invalid password' });
}
res.status(200).json({ message: 'Login successful',token,premimum });
}
catch(err){
    res.status(404).json({ message: 'An error occurred while logging in' });
}
}