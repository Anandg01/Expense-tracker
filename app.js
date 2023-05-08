const express=require('express')
const sequelize=require('./util/database')
const userRout=require('./router/user')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user',userRout)
app.use((req, res)=>{
    res.send(`<h1>Not a page</h1>`)
})

sequelize
.sync()
//.sync({force:true})
.then((res)=>{
    app.listen(2000,()=>console.log('server Running...'))
})
.catch((err)=>console.log(err))
