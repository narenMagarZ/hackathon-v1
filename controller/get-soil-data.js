import joi from 'joi'
import { getSuggestedCrops,getClimate, getWeatherFromCode, appError } from '../utils/index.js'
import axios from 'axios'
import redis from '../config/redis.js'
async function getSoilData(req,res,next){
     const {error,value}=joi.object({
          lat:joi.number().required(),
          lng:joi.number().required()
     }).validate(req.query)
     console.log(req.query)
     if(error){
          return next(new appError(400,error.message))
     }
     try{
          const {lat,lng}=value
          const response = await axios.get(`https://soil.narc.gov.np/soil/api/soildata?lat=${parseInt(lat)}&lon=${parseInt(lng)}`)
          const soilData = response.data
          let climate = await getClimate(lat,lng)
          const weather = getWeatherFromCode(climate.weathercode)
          climate = {
               ...climate,
               weather,
               is_day:undefined,
               weathercode:undefined
          }
          let suggestedCrops = await redis.get(`suggested-crop:lat:${lat},lng:${lng}`)
          let isCached = true
          if(!suggestedCrops){
               isCached = false
               suggestedCrops = await getSuggestedCrops(`Acts as a farmer, suggest a crops which are suitable to harvest for this ${soilData}.Response must be in a json format, include only name field of crops.Note:no need to mention introduction and conclusion only the name of crops`)
               await redis.set(`suggested-crop:lat:${lat},lng:${lng}`,JSON.stringify(suggestedCrops))
          }
          return res.status(200).json({
               soilData,
               suggestedCrops:isCached?JSON.parse(suggestedCrops):suggestedCrops,
               climate
          })
     }

     catch(err){
          console.error(err)
          return next()
     }
}

export default getSoilData