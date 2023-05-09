const express=require('express')
const sequelize=require('./util/database')
const userRout=require('./router/user')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express();

const User=require('./models/user')
const Expance=require('./models/expance')

const expanceRout=require('./router/expance')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user',userRout)
app.use(expanceRout)
app.use((req, res)=>{
    res.send(`<h1>Not a page</h1>`)
})

User.hasMany(Expance);
Expance.belongsTo(User)

sequelize
.sync()
//.sync({force:true})
.then((res)=>{
    app.listen(2000,()=>console.log('server Running...'))
})
.catch((err)=>console.log(err))
