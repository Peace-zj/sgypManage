const mongoose = require('mongoose')


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

let Unsubmitteds = mongoose.model('unsubmitteds',unsubmittedsSchema)


module.exports = Unsubmitteds
