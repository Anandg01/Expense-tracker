const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const expance=sequelize.define('expance',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        alowNull:false,
        primaryKey:true
    },
    expAmount:{
        type:Sequelize.INTEGER,
        alowNull:false
    },
    description:{
        type:Sequelize.STRING,
        alowNull:false
    },
    catagory:{
        type:Sequelize.STRING,
        alowNull:false
    }
})

module.exports=expance;