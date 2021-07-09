const mongoose = require('mongoose')

// 创建一个与数据集合(表)相关的schema对象
let stocksSchema = new mongoose.Schema({
  name: {type:String,required:true},
  code:{type:String,required:true},
  color: {type:String,required:true},
  img: {type:String,required:true},
  price: {type:Number,required:true},
  total: {type:Number,required:true},
  order: {type:Number,required:true}
})

// 把schema对象转换成与数据集合相关的数据模型
// mongoose.model('集合名/表名',schema对象)
let Stocks = mongoose.model('stocks',stocksSchema)
// 使用 User 数据模型来进行增删改查

module.exports = Stocks
