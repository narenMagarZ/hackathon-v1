import joi from 'joi'
import { appError,fetchCropGrowTime } from '../utils/index.js'
import UserService from '../services/user-service.js'
import redis from '../config/redis.js'
async function yieldCrop(req,res,next){
     const {id} = req.user
     const {error,value}=joi.object({
          crop:joi.string().required()
     }).validate(req.body)
     if(error){
          return next(new appError(400,error.message))
     }
     try{
          // need harvest start time-> date.now
          // end time -> from api
          const {crop}=value
          let cropHarvestPeriod = await redis.get(`${crop}:period`)
          if(!cropHarvestPeriod){
               cropHarvestPeriod = await fetchCropGrowTime(crop)
               await redis.set(`${crop}:period`,cropHarvestPeriod)
          }
          const startTime = getHarvestStartTime()
          const endTime = getHarvestEndDate(cropHarvestPeriod)
          const diff = dateToMs(endTime) - dateToMs(startTime)
          const startTimeInMs = dateToMs(startTime)
          const div = diff / 5
          const irrigation =  startTimeInMs + div
          const pestControl = startTimeInMs + 2 * div
          const fertilization = startTimeInMs + 3 * div
          const weedManagement = startTimeInMs + 4 * div
          console.log(new Date(irrigation),new Date(pestControl),new Date(fertilization),new Date(weedManagement))
          const cropInfo = {
               name:value.crop,
               harvestStartDate:getHarvestStartTime(),
               irrigation:[irrigation],
               pestControl:[pestControl],
               fertilization:[fertilization],
               weedManagement:[weedManagement],
               harvestEndDate:getHarvestEndDate(cropHarvestPeriod)
          }
          await new UserService().createYield(id,cropInfo)
          return res.status(201).json({
               msg:"okay"
          })
     }
     catch(err){
          console.error(err)
          return next(new appError(500,err.message))
     }
}
const getHarvestStartTime=()=>{
     const date = new Date()
     return date
}
const getHarvestEndDate=(period)=>{
     const date = new Date()
     let year = date.getFullYear()
     let month = date.getMonth()+1
     const day = date.getDate()
     if(month+period>12){
          year = year+1
          month = (month + parseInt(period)) - 12 === 0? 1 : (month + parseInt(period)) - 12
     }
     return `${year}-${month}-${day}`
}

const dateToMs = (date)=>{
     return new Date(date).getTime()
}

dateToMs()

export default yieldCrop