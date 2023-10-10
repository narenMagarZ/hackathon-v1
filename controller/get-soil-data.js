import joi from 'joi'
import { getSuggestedCrops,getClimate, getWeatherFromCode } from '../utils/index.js'
import axios from 'axios'
async function getSoilData(req,res,next){
     const {error,value}=joi.object({
          lat:joi.number().required(),
          lng:joi.number().required()
     }).validate(req.query)
     if(error){
          return next()
     }
     try{
          const {lat,lng}=value
          const response = await axios.get(`https://soil.narc.gov.np/soil/api/soildata?lat=${lat}&lon=${lng}`)
          const soilData = response.data
          let climate = await getClimate(lat,lng)
          const weather = getWeatherFromCode(climate.weathercode)
          climate = {
               ...climate,
               weather,
               is_day:undefined,
               weathercode:undefined
          }
          const suggestedCrops = await getSuggestedCrops(`Acts as a farmer, suggest a crops which are suitable to harvest for this ${soilData}.Response must be in a json format, include only name field of crops.Note:no need to mention introduction and conclusion only the name of crops`)
          return res.status(200).json({
               soilData,
               suggestedCrops,
               climate
          })
     }

     catch(err){
          console.error(err)
          return next()
     }
}

export default getSoilData