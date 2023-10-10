import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
     firstName:{
          type:String,
          required:true
     },
     lastName:{
          type:String,
          required:true
     },
     email:{
          type:String
     },
     province:{
          type:String,
          required:true,
          enum:["Karnali","Lumbini","Koshi","Madhesh","Gandaki","Sudurpashchim","Bagmati"]
     },
     phoneNumber:{
          type:String,
          required:true,
          unique:true
     },
     password:{
          type:String,
          required:true
     },
     createdAt:{
          type:Date,
          default:Date.now
     },
     updatedAt:{
          type:Date
     }
})

const User = mongoose.model('users',userSchema)
export default User