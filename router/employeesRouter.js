const express = require('express')
const router = express.Router()
const Employees = require('../db/models/employeesModel')


// vip用户接口
/**
 * @api {post} /user/login 用户登录
 * @apiGroup user
 *
 * @apiParam {String} user 用户账号
 * @apiParam {String} pass 账号密码
 *
 * @apiSuccessExample 返回数据示例:
 * {
 *    err: -1,
 *    msg: '参数不能为空'
 * }
 */
router.post('/login',(req,res)=>{
  // 接收数据，处理数据，返回数据
  // let {username,password} = req.body
  let {name,psword} = req.body
  // 查询数据库
  console.log(req.query)
//   let {account} = req.query
//   console.log(account)
Employees.find({name,psword})
  .then((data)=>{
    // if (data.length > 0) {
    //   res.send(data)
    // } else {
    //   // 数据库没有此账号
    //   res.send('用户名或密码错误')
    // }
    res.send(data)
    // res.send(data)
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.post('/register',(req,res)=>{
    // 接收数据，处理数据，返回数据
    // 使用User数据模型来增删改查
    // res.send('register ok')
    let {name,sex,account,level,tel} = req.body
  
     console.log(req.body)
    
    // 先查询数据库，看是否已有此账号
    Employees.find({name,level})
    .then((data)=>{
      if (data.length > 0) {
        res.send({err: -2,msg: '用户已存在'})
        return Promise.reject('break promise')
      } else {
        // 数据库没有此账号，可以注册，插入数据
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
    // 接收数据，处理数据，返回数据
    // let {username,password} = req.body
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
        // if (data.length > 0) {
        //   res.send(data)
        // } else {
        //   res.send({err: -1,msg: '账号或密码错误'})
        // }
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

