const express = require('express')
const router = express.Router()
const User = require('../db/models/customersModel')
// const mail = require('../utils/mail')

// 缓存验证码
let cacheCode = {
  // "570062873@qq.com": {codenum: 76877,time: Date.now()},
  // "57005700@qq.com": 5542
}

// 用户注册接口
/**
 * @api {post} /user/register 用户注册
 * @apiGroup user
 *
 * @apiParam {String} user 用户账号
 * @apiParam {String} pass 账号密码
 * @apiParam {String} email 用户邮箱
 * @apiParam {String} code 邮箱验证码
 *
 * @apiSuccessExample 返回数据示例:
 * {
 *    err: -1,
 *    msg: '参数不能为空'
 * }
 */
router.post('/register',(req,res)=>{

  let {name,password} = req.body

  // 空值判断
  // if (!user || !pass || !email || !code) {
  //   return res.send({err: -1,msg: '参数不能为空'})
  // }

  // 校验验证码
  // if (code !== cacheCode[email]) {
  //   return res.send({err: -4,msg: '验证码错误'})
  // }

  // 先查询数据库，看是否已有此账号
  User.find({name})
  .then((data)=>{
    if (data.length > 0) {
      res.send('用户名已注册')
      return Promise.reject('break promise')
    } else {
      // 数据库没有此账号，可以注册，插入数据
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
  // 接收数据，处理数据，返回数据
  // 使用User数据模型来增删改查
  // res.send('register ok')
  // console.log(req.body)
  let {name,password,tel,email,level,order,consumption} = req.body
  console.log(req.body)

  // 空值判断
  if (!name || !password || !tel || !email|| !level || !order|| !consumption) {
    return res.send({err: -1,msg: '参数不能为空'})
  }

  // 校验验证码
  // if (code !== cacheCode[email]) {
  //   return res.send({err: -4,msg: '验证码错误'})
  // }

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


// 用户登录接口
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
router.get('/login',(req,res)=>{
  // 接收数据，处理数据，返回数据
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
  // let {username,password} = req.body
  // let {name,password} = req.query
  console.log('req.query')
  // 空值判断
  // if (!username || !password) {
  //   return res.send({err: -1,msg: '参数不能为空'})
  // }
  // 查询数据库
  User.find()
  .then((data)=>{
    // if (data.length > 0) {
    //   res.send(data)
    // } else {
    //   // 数据库没有此账号
    //   res.send({err: -1,msg: '账号或密码错误'})
    // }
    console.log(data)
    res.send(data)
  })
  .catch((err)=>{
    console.log(err)
  })
})



//修改用户信息接口
router.post('/update',(req,res)=>{
  let {level,tel,_id} = req.body
  console.log(req.body,'body')
  // 空值判断
  // if (!name||!price||!desc||!type||!imgurl||!_id) {
  //   return res.send({err:-1,msg:'参数不能为空'})
  // }
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
// 发送验证码接口
/**
 * @api {post} /user/sendMail 发送邮箱验证码
 * @apiGroup user
 *
 * @apiParam {String} email 用户邮箱
 *
 * @apiSuccessExample 返回数据示例:
 * {
 *    err: -1,
 *    msg: '参数不能为空'
 * }
 */
// router.post('/sendMail',(req,res)=>{
//   // 接收数据，处理数据，返回数据
//   let {email} = req.body

//   // 空值判断
//   if (!email) {
//     return res.send({err: -1,msg: '参数不能为空'})
//   }

//   // 邮箱格式效验
//   let reg = /\w{6,20}@[0-9a-z]{1,10}(\.[a-z]{2,3}){1,2}/
//   if (!reg.test(email)) {
//     return res.send({err: -2,msg: '邮箱格式错误'})
//   }

//   // 随机验证码
//   let code = parseInt(Math.random()*100000)
//   cacheCode[email] = code // 缓存验证码  new Date.getTime()
//   // cacheCode[email] = {codenum: code, time: Date.now()} // 缓存验证码
  
//   // 发送邮件
//   mail.send(email,'验证码','您的验证码是：'+code+'，有效期5分钟。')
//   .then(()=>{
//     res.send({err: 0,msg: '验证码发送成功'})
//   })
//   .catch(()=>{
//     res.send({err: -1,msg: '验证码发送失败'})
//   })
// })

// 导出路由对象
module.exports = router

