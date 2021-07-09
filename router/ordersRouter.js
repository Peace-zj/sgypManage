const express = require('express')
const router = express.Router()
const Orders = require('../db/models/ordersModel')

router.get('/msg',(req,res)=>{
    let {customer,tradeName} = req.query
    console.log(req.query)
    if(customer === undefined && tradeName === undefined){
        Orders.find()
      .then((data)=>{
        console.log(data)
        res.send(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    else if(tradeName !== undefined){
      Orders.find({tradeName})
      .then((data)=>{
        console.log(data)
        res.send(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }else{
        Orders.find({customer})
      .then((data)=>{
        console.log(data)
        res.send(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }  
})

//插入新的订单
router.post('/neworder',(req,res)=>{
  let {tradeNum,tradeName,tradePrice,tradeColor,tradeImg,name,tel,address,customer} = req.body[0]
  // console.log(req.body)
  Orders.insertMany({tradeNum,tradeName,tradePrice,tradeColor,tradeImg,name,tel,address,customer})
  .then((data)=>{
    res.send(data)
  })
  .catch(err=>{
    res.send(err)
  })
})

//查询未审核的订单
router.get('/review',(req,res)=>{
    Orders.find({state:false})
    .then((data)=>{
      res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
})

//修改订单审核状态
router.post('/state',(req,res)=>{
    let {_id} = req.body
    Orders.updateMany({_id},{state:true})
    .then(()=>{
      return Orders.find()
    })
    .then((data)=>{
      res.send(data)
    })
    .catch((err)=>{
      res.send(err)
    })
})
// 导出路由对象
module.exports = router

