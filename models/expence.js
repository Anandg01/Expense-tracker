const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const expence=sequelize.define('expence',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        alowNull:false,
        primaryKey:true
    },
    amount:{
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
    },
    date:{
        type:Sequelize.STRING,
        alowNull:false
    }
})

module.exports=expence;