
// 加载mongoose模块，用于在node中操作数据库
const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/sgyp',{ useNewUrlParser: true, useUnifiedTopology: true })

// 保存连接数据库对象
let db = mongoose.connection

// 监听连接对象的error事件，连接数据库失败时触发
db.on('error', console.error.bind(console, 'connection error:'))

// 监听连接对象的连接成功事件，连接数据库成功时触发
db.once('open', function() {
  console.log('----------db connect ok------------')
})
