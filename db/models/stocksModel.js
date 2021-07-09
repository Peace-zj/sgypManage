const mongoose = require('mongoose')

let stocksSchema = new mongoose.Schema({
  name: {type:String,required:true},
  code:{type:String,required:true},
  color: {type:String,required:true},
  img: {type:String,required:true},
  price: {type:Number,required:true},
  total: {type:Number,required:true},
  order: {type:Number,required:true}
})

let Stocks = mongoose.model('stocks',stocksSchema)

module.exports = Stocks
