const express=require('express')
const sequelize=require('./util/database')
const userRout=require('./router/user')
const resetpasword=require('./router/resetpassword')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express();

const User=require('./models/user')
const Expance=require('./models/expance')
const order=require('./models/orders')
const expanceRout=require('./router/expance')
const Forgotpassword=require('./models/resetpassword')
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('views'));


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

sequelize
.sync()
//.sync({force:true})
.then((res)=>{
    app.listen(2000,()=>console.log('server Running...'))
})
.catch((err)=>console.log(err))
