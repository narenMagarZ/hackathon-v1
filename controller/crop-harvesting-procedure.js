
import joi from "joi"
import {appError, getCropHarvestingProcedure} from '../utils/index.js'
import redis from '../config/redis.js'
async function cropHarvestingProcedure(req,res,next){
     const {error,value}=joi.object({
          crop:joi.string().required()
     }).validate(req.query)
     if(error){
          return next(new appError(400,error.message))
     }
     const {crop} = value
     try{
          let procedure = await redis.get(crop)
          if(!procedure){
               procedure = await getCropHarvestingProcedure(`
               Acts a pro farmer, return steps to grow ${crop} from beginning to end in a json format.Note: only include title and short and concise description.
               `)
               console.log(procedure)
               await redis.set(crop,procedure)
          }
          return res.status(200).json({
               procedure:JSON.parse(procedure)
          })
     }
     catch(err){
          console.error(err)
          return next(new appError(500,err.message))
     }
}

export default cropHarvestingProcedure