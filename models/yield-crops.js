
import mongoose from "mongoose";


const yieldCropsSchema = mongoose.Schema({
     name:{
          type:String,
          required:true
     },
     userId:{
          type:mongoose.Types.ObjectId,
          required:true,
          ref:"users"
     },
     harvestStartDate:{
          type:Date,
          required:true
     },
     irrigation:{
          type:[{
               type:Date
          }]
     },
     pestControl:{
          type:[{
               type:Date
          }]
     },
     fertilization:{
          type:[{
               type:Date
          }]
     },
     weedManagement:{
          type:[{
               type:Date
          }]
     },
     harvestEndDate:{
          type:Date,
          required:true
     }

})

const YieldCrops = mongoose.model("yieldcrops",yieldCropsSchema)

export default YieldCrops