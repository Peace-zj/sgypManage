const express = require('express')
const router = express.Router()
const Unsubmitteds = require('../db/models/unsubmittedsModel')

//从购物车跳到订单页面时插入未提交的订单
router.post('/newpdts',(req,res)=>{
    // let {productName,price,skuName,user,productNum,image} = req.body
    let list = req.body
    list.forEach(item=>{
        Unsubmitteds.insertMany({tradeName:item.productName,tradePrice:item.price,tradeColor:item.skuName,customer:item.user,tradeNum:item.productNum,tradeImg:item.image,code:item.code}).then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    })
})

//查询新的订单商品
router.post('/msg',(req,res)=>{
    // let {productName,price,skuName,user,productNum,image} = req.body
    let {code} = req.body
    Unsubmitteds.find({code:code})
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
})

//提交订单后删除未提交订单
router.post('/delunsbted',(req,res)=>{
    let {_id} = req.body[0]
    // console.log(req.body[0])
    Unsubmitteds.deleteOne({_id:_id})
    .then((data)=>{
      res.send(data)
    })
    .catch(()=>{
      res.send({err:-2,msg:'删除失败'})
    })
  })
// 导出路由对象
module.exports = router

