const mongoose = require('mongoose')

let ordersSchema = new mongoose.Schema({
  customer: {type:String,required:true},
  name:{type:String,required:true},
  tel:{type:String,default:'/'},
  address:{type:String,required:true,default:'/'},
  tradeName: {type:String,required:true},
  tradeColor: {type:String,required:true},
  tradeImg: {type:String,required:true},
  tradePrice: {type:Number,required:true},
  tradeNum: {type:Number,required:true,default:0},
  state: {type:Boolean,default:false}
})

let Orders = mongoose.model('orders',ordersSchema)

module.exports = Orders
