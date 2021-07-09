const mongoose = require('mongoose')

// 创建一个与数据集合(表)相关的schema对象
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

// 把schema对象转换成与数据集合相关的数据模型
// mongoose.model('集合名/表名',schema对象)
let Employees = mongoose.model('employees',employeesSchema)
// 使用 User 数据模型来进行增删改查

module.exports = Employees
