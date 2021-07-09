const express = require('express')
const router = express.Router()
const Address = require('../db/models/addressModel')


//添加新地址
router.post('/newaddress',(req,res)=>{
    let {user,name,tel,province,county,city,addressDetail,isDefault,selected} = req.body 
    let address = province + city + county + addressDetail 
    Address.insertMany({user,name,tel,address,isDefault,selected:true})
      .then((data)=>{
        console.log(data)
        res.send(data)
      })
      .catch((err)=>{
        console.log(err)
      })
})


//查询某用户的地址
router.post('/msg',(req,res)=>{
    let {user} = req.body
    Address.find({user})
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

//修改地址
router.post('/editaddress',(req,res)=>{
    let {_id,user,name,tel,province,county,city,addressDetail,isDefault,selected} = req.body 
    let address = province + city + county + addressDetail
      Address.updateMany({_id},{user,name,tel,address,isDefault,selected})
      .then(()=>{
        res.send({err:0,msg:'修改成功'})
      })
      .catch((err)=>{
        res.send({err:-2,msg:'修改失败'})
      })
})


//修改selected
router.post('/editanother',(req,res)=>{
  let {_id,selected} = req.body 
      Address.updateMany({selected:true},{selected:false})
      .then(()=>{
        console.log({err:0,msg:'修改成功'})
      })
      .catch((err)=>{
        res.send({err:-2,msg:'修改失败'})
      })
      Address.updateMany({_id},{selected})
      .then(()=>{
        res.send({err:0,msg:'修改成功'})
      })
      .catch((err)=>{
        res.send({err:-2,msg:'修改失败'})
      })
})

//删除地址
router.post('/deletaddress',(req,res)=>{
  let {_id} = req.body
  Address.remove({_id:_id})
  .then(()=>{
    res.send({err:0,msg:'删除成功'})
  })
  .catch(()=>{
    res.send({err:-2,msg:'删除失败'})
  })
})
// 导出路由对象
module.exports = router

