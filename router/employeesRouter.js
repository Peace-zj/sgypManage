const express = require('express')
const router = express.Router()
const Employees = require('../db/models/employeesModel')


router.post('/login',(req,res)=>{
  let {name,psword} = req.body
  // console.log(req.query)
Employees.find({name,psword})
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.post('/register',(req,res)=>{
    let {name,sex,account,level,tel} = req.body
  
     console.log(req.body)
    
    Employees.find({name,level})
    .then((data)=>{
      if (data.length > 0) {
        res.send({err: -2,msg: '用户已存在'})
        return Promise.reject('break promise')
      } else {
        return Employees.insertMany({name,sex,account,level,tel})
      }
    })
    .then((data)=>{
      // console.log(data)// undefined
      if (data.length > 0) {
        res.send(data)
      } else {
        res.send({err: -3,msg: '注册失败'})
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  })

router.get('/message',(req,res)=>{
    let {code,name} = req.query
    console.log(req.query)
    if(code === undefined && name === undefined){
      Employees.find()
      .then((data)=>{
        console.log(data)
        res.send(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    else if(name !== undefined){
      Employees.find({name})
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
      Employees.find({code})
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

