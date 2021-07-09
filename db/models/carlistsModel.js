const mongoose = require('mongoose')

// 创建一个与数据集合(表)相关的schema对象
let carlistsSchema = new mongoose.Schema({
  user:{type:String},
  productNum: {type:Number,required:true},
  image: {type:String},
  productName: {type:String,default:'/'},
  productId: {type:Number,default:0},
  price: {type:String,default:''},
  skuName: {type:String,default:''},
  selected:{type:Boolean,default:false}
})

// 把schema对象转换成与数据集合相关的数据模型
// mongoose.model('集合名/表名',schema对象)
let Carlists = mongoose.model('carlists',carlistsSchema)
// 使用 User 数据模型来进行增删改查

module.exports = Carlists
