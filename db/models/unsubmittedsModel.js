const mongoose = require('mongoose')

// 创建一个与数据集合(表)相关的schema对象
let unsubmittedsSchema = new mongoose.Schema({
  customer: {type:String,required:true},
  name:{type:String,default:'/'},
  tel:{type:String,default:'/'},
  address:{type:String,default:'/'},
  tradeName: {type:String,required:true},
  tradeColor: {type:String,required:true},
  tradeImg: {type:String,required:true},
  tradePrice: {type:Number,required:true},
  tradeNum: {type:Number,required:true,default:0},
  state: {type:Boolean,default:false},
  code:{type:Number,required:true},
  isSubmitted:{type:Boolean,default:false}
})

// 把schema对象转换成与数据集合相关的数据模型
// mongoose.model('集合名/表名',schema对象)
let Unsubmitteds = mongoose.model('unsubmitteds',unsubmittedsSchema)
// 使用 User 数据模型来进行增删改查

module.exports = Unsubmitteds
