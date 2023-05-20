const express=require('express')
const sequelize=require('./util/database')
const userRout=require('./router/user')
const resetpasword=require('./router/resetpassword')
const bodyParser=require('body-parser')
const fs=require('fs')
const path=require('path')
const cors=require('cors')
const helmet=require('helmet')
const morgan=require('morgan')
const app=express();
const User=require('./models/user')
const Expance=require('./models/expance')
const order=require('./models/orders')
const expanceRout=require('./router/expance')
const Forgotpassword=require('./models/resetpassword')
const fileUrl=require('./models/downloadFileurl')
app.use(cors())
app.use(helmet())
require('dotenv').config();

const accessLogStream=fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags:'a'}
);

app.use(morgan('combined',{stream:accessLogStream}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user',userRout)
app.use('/password',resetpasword)

app.use(expanceRout)
app.use((req, res)=>{
    res.send(`<h1>Not a page</h1>`)
})

User.hasMany(Expance);
Expance.belongsTo(User)

User.hasMany(order);
order.belongsTo(User);

User.hasMany(Forgotpassword)
Forgotpassword.belongsTo(User)

User.hasMany(fileUrl)
fileUrl.belongsTo(User)

sequelize
.sync()
//.sync({force:true})
.then((res)=>{
    app.listen(process.env.Port_name,()=>console.log('server Running... '))
})
.catch((err)=>console.log(err))
