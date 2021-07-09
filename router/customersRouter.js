const express = require('express')
const router = express.Router()
const User = require('../db/models/customersModel')


router.post('/register',(req,res)=>{

  let {name,password} = req.body

  User.find({name})
  .then((data)=>{
    if (data.length > 0) {
      res.send('用户名已注册')
      return Promise.reject('break promise')
    } else {
      return User.insertMany({name,password})
    }
  })
  .then((data)=>{
    // console.log(data)// undefined
    if (data.length > 0) {
      res.send('注册成功')
    } else {
      res.send({err: -3,msg: '注册失败'})
    }
  })
  .catch((err)=>{
    console.log(err)
  })
})


//VIP用户注册
router.post('/vip',(req,res)=>{
  let {name,password,tel,email,level,order,consumption} = req.body
  console.log(req.body)

  // 空值判断
  if (!name || !password || !tel || !email|| !level || !order|| !consumption) {
    return res.send({err: -1,msg: '参数不能为空'})
  }

  // 先查询数据库，看是否已有此账号
  User.find({name})
  .then((data)=>{
    if (data.length > 0) {
      res.send({err: -2,msg: '用户名已存在'})
      return Promise.reject('break promise')
    } else {
      // 数据库没有此账号，可以注册，插入数据
      return User.insertMany({name,password,tel,email,level,order,consumption})
    }
  })
  .then((data)=>{
     console.log(data)// undefined
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



router.get('/login',(req,res)=>{
  // let {username,password} = req.body
  let {name,password} = req.query
  console.log('req.query')

  // 空值判断
  if (!name || !password) {
    return res.send({err: -1,msg: '参数不能为空'})
  }
  // 查询数据库
  User.find({name,password})
  .then((data)=>{
    if (data.length > 0) {
      res.send(data)
    } else {
      // 数据库没有此账号
      res.send({err: -1,msg: '账号或密码错误'})
    }
  })
  .catch((err)=>{
    console.log(err)
  })
})


//查询所有用户信息的接口
router.get('/msg',(req,res)=>{
  
  User.find()
  .then((data)=>{
    // console.log(data)
    res.send(data)
  })
  .catch((err)=>{
    console.log(err)
  })
})



//修改用户信息接口
router.post('/update',(req,res)=>{
  let {level,tel,_id} = req.body
  // console.log(req.body,'body')
  // 空值判断
  if (!level||!tel||!_id) {
    return res.send({err:-1,msg:'参数不能为空'})
  }
  // 修改数据
  User.updateMany({_id:_id},{level,tel})
  .then(()=>{
    res.send({err:0,msg:'修改成功'})
  })
  .catch(()=>{
    res.send({err:-2,msg:'修改失败'})
  })
})


//删除用户信息
router.post('/del',(req,res)=>{

  let {_id} = req.body
  console.log(req.body)
  // 空值判断
  if (!_id) {
    return res.send({err:-1,msg:'参数不能为空'})
  }

  // 删除数据
  User.remove({_id:_id})
  .then(()=>{
    res.send({err:0,msg:'删除成功'})
  })
  .catch(()=>{
    res.send({err:-2,msg:'删除失败'})
  })
})


// 导出路由对象
module.exports = router

