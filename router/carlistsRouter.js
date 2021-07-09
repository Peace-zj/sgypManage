const express = require('express')
const router = express.Router()
const Carlists = require('../db/models/carlistsModel')


//向购物车添加新商品
router.post('/lists',(req,res)=>{
    let {user,productNum,image,productName,productId,price,skuName} = req.body 
    Carlists.find({user,productId})
    .then((data)=>{
        // console.log(data)
        // res.send(data)
        if(data.length>0){
          data.forEach((item,index)=>{
            if(item.skuName === skuName){
              productNum = productNum + item.productNum
              // console.log(productNum)
              Carlists.updateMany({user,productId,skuName},{productNum}).then((data)=>{
                console.log(data)
              })
              .catch((err)=>{
                res.send(err)
              })
            }
            else{
              if(index===data.length-1){
                Carlists.insertMany({user,productNum,image,productName,productId,price,skuName}).then((data)=>{
                  console.log(data)
                })
                .catch((err)=>{
                  res.send(err)
                })
              }
              
            }
         })
        }
        if(data.length===0){
          Carlists.insertMany({user,productNum,image,productName,productId,price,skuName}).then((data)=>{
            console.log(data)
          })
          .catch((err)=>{
            res.send(err)
          })
        }       
    })
    .then((data)=>{
      res.send(data)
    })
    .catch((err)=>{
      res.send(err)
    })
    
})


//查询某用户的购物车
router.post('/msg',(req,res)=>{
    let {user} = req.body
    Carlists.find({user})
    .then(data=>{
        // console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})


//提交订单时删除购物车里的商品
router.post('/delelists',(req,res)=>{
  let list = req.body.filter(item=>item.selected===true)
  list.forEach(item=>{
    Carlists.deleteOne({user:item.user,productId:item.productId,skuName:item.skuName})
    .then((data)=>{
      console.log(data)
    })
    .catch(()=>{
      console.log('失败')
    })
  })
})



// 导出路由对象
module.exports = router

