const Sequelize=require('sequelize')

const sequelize=new Sequelize('expance','root','pk123',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;