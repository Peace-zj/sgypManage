const mongoose = require('mongoose')

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

let Carlists = mongoose.model('carlists',carlistsSchema)

module.exports = Carlists
