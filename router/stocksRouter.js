const express = require('express')
const router = express.Router()
const Stocks = require('../db/models/stocksModel')

router.get('/msg',(req,res)=>{
    let {name,code} = req.query
    console.log(req.query)
    if(name === undefined && code===undefined){
      Stocks.find()
      .then((data)=>{
        console.log(data)
        res.send(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    else if(code !== undefined){
      Stocks.find({code})
      .then((data)=>{
        console.log(data)
        res.send(data)
      })
      .catch((err)=>{
        console.log(err)
        res.send(err)
      })
    }
    else{
        Stocks.find({name})
      .then((data)=>{
        console.log(data)
        res.send(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }  
})


// 导出路由对象
module.exports = router

