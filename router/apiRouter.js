import express from 'express'
import auth from '../middleware/auth.js'
import axios from 'axios'
import redis from '../config/redis.js'
import {
     getClimate,
     getWeatherFromCode,
     getSuggestedCrops,
     appError
} from '../utils/index.js'
import {cropHarvestingProcedure, getSoilData, signup, signin, yieldCrop} from '../controller/index.js'
const apiRouter = express.Router()



apiRouter.get('/soildata',getSoilData)

apiRouter.get('/procedure',cropHarvestingProcedure)
apiRouter.post('/auth/signup',signup)
apiRouter.post('/auth/signin',signin)
apiRouter.post('/yieldcrop',auth,yieldCrop)
apiRouter.get('/suggestedcrops',async(req,res,next)=>{
     const {lat,lng}=req.query
     try{
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

          let suggestedCrops = await redis.get(`suggested-crop:lat:${lat},lng:${lng}`)
          let isCached = true
          if(!suggestedCrops){
               isCached = false
               suggestedCrops = await getSuggestedCrops(`Acts as a farmer, suggest a crops which are suitable to harvest for this ${soilData}.Response must be in a json format, include only name field of crops like {name:"cropName"}.Note:no need to mention introduction and conclusion only the name of crops`)
               await redis.set(`suggested-crop:lat:${lat},lng:${lng}`,JSON.stringify(suggestedCrops))
          }
          console.log(suggestedCrops)
          return res.status(200).json({
               suggestedCrops:isCached ? JSON.parse(suggestedCrops):suggestedCrops
          })
     }
     catch(err){
          console.error(err)
          return next(new appError(500,err.message))
     }

})
export default apiRouter