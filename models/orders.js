const Sequilizer=require('sequelize')
const sequelize=require('../util/database')

const Order=sequelize.define('order',{
    id:{
        type:Sequilizer.INTEGER,
        autoIncrement:true,
        alowNull:false,
        primaryKey:true
    },
    paymentId:Sequilizer.STRING,
    orderId:Sequilizer.STRING,
    status:Sequilizer.STRING
})


module.exports=Order;