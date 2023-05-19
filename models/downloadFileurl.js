const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const downloadedUrl= sequelize.define('fileurltable',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        alowNull:false,
        primaryKey:true
    },
    fileURL:Sequelize.STRING
})

module.exports=downloadedUrl