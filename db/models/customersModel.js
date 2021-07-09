const mongoose = require('mongoose')

// 创建一个与数据集合(表)相关的schema对象
let customersSchema = new mongoose.Schema({
  name: {type:String,required:true},
  password: {type:String,required:true},
  tel: {type:String,default:'/'},
  email: {type:String,default:'/'},
  level: {type:String,default:'普通用户'},
  order: {type:Number,default:0},
  consumption: {type:Number,default:0}
})

// 把schema对象转换成与数据集合相关的数据模型
// mongoose.model('集合名/表名',schema对象)
let Customers = mongoose.model('customers',customersSchema)
// 使用 User 数据模型来进行增删改查

module.exports = Customers
