const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const user=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        alowNull:false,
        primaryKey:true
    },
    name:{
    type:Sequelize.STRING,
    alowNull:false
    },

    email:{
    type:Sequelize.STRING,
    alowNull:false,
    unique:true
    },
    password:{
        type:Sequelize.STRING,
        alowNull:false,
    },
    ispremiumuser:Sequelize.BOOLEAN

})

module.exports=user;