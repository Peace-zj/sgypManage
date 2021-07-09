// 项目入口文件
const express = require('express')
const db = require('./db/connect')
const customersRouter = require('./router/customersRouter')
const employeesRouter = require('./router/employeesRouter')
const stocksRouter = require('./router/stocksRouter')
const ordersRouter = require('./router/ordersRouter')
const addressRouter = require('./router/addressRouter')
const carlistsRouter = require('./router/carlistsRouter')
const unsubmittedsRouter = require('./router/unsubmittedsRouter')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const app = express()
app.use('/',cors())

app.use('/',bodyParser.json()) //解析json数据
app.use('/',bodyParser.urlencoded({extened: false})) // 解析表单数据
app.use('/customers',customersRouter)
app.use('/employees',employeesRouter)
app.use('/stocks',stocksRouter)
app.use('/orders',ordersRouter)
app.use('/address',addressRouter)
app.use('/carlists',carlistsRouter)
app.use('/unsubmitteds',unsubmittedsRouter)

app.listen(3003,()=>{
  console.log('-----------server start------------')
})
