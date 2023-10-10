import { appError } from "../utils/index.js"
import joi from 'joi'
import UserService from '../services/user-service.js'
async function trackCropHarvest(req,res,next){
     const userId = req.user
     const {error,value}=joi.object({
          cropId:joi.string().required()
     }).validate(req.body)
     if(error){
          return next(new appError(400,error.message))
     }
     const {cropId} = value
     try{
          // get the yield crop
          // get the irrigation, harvest time, end time, pesticide time, weed management time and fertilization time
          const yieldCrop = await new UserService().getYieldCrop(userId,cropId)
          return res.status(200).json({
               msg:"okay"
          })
     }
     catch(err){
          console.error(err)
          return next(new appError(500,err.message))
     }
}

export default trackCropHarvest