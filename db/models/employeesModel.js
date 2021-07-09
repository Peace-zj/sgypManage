const mongoose = require('mongoose')

let employeesSchema = new mongoose.Schema({
  // id: {type:Number},
  code:{type:String,required:true},
  name: {type:String,required:true},
  psword: {type:String,required:true},
  sex: {type:String,required:true},
  edu: {type:String,required:true},
  age: {type:Number,required:true},
  salary: {type:Number,required:true},
  tel: {type:String,required:true},
  email: {type:String,required:true},
  birth:{type:String,required:true},
  entryTime:{type:String,required:true},
  workDuration:{type:String,required:true},
  address: {type:String,required:true},
  hobby: {type:String,required:true},
  skill: {type:String,required:true},
  roleName: {type:String,required:true},
  roleType: {type:Number,required:true}
})

let Employees = mongoose.model('employees',employeesSchema)

module.exports = Employees
