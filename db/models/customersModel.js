const mongoose = require('mongoose')

let customersSchema = new mongoose.Schema({
  name: {type:String,required:true},
  password: {type:String,required:true},
  tel: {type:String,default:'/'},
  email: {type:String,default:'/'},
  level: {type:String,default:'普通用户'},
  order: {type:Number,default:0},
  consumption: {type:Number,default:0}
})

let Customers = mongoose.model('customers',customersSchema)

module.exports = Customers
