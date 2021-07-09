const mongoose = require('mongoose')

// 创建一个与数据集合(表)相关的schema对象
let addressSchema = new mongoose.Schema({
  user: {type:String,required:true},
  name: {type:String,required:true},
  tel:{type:String,required:true},
  address: {type:String,required:true},
  selected:{type:Boolean,defalut:true}
})

// 把schema对象转换成与数据集合相关的数据模型
// mongoose.model('集合名/表名',schema对象)
let Address = mongoose.model('sites',addressSchema)

module.exports = Address
