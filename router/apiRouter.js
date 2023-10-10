import express from 'express'
import auth from '../middleware/auth.js'
import {cropHarvestingProcedure, getSoilData, signup, signin, yieldCrop,getYieldedCrops} from '../controller/index.js'
const apiRouter = express.Router()



apiRouter.get('/soildata',getSoilData)

apiRouter.get('/procedure',cropHarvestingProcedure)
apiRouter.post('/auth/signup',signup)
apiRouter.post('/auth/signin',signin)
apiRouter.post('/yieldcrop',auth,yieldCrop)
export default apiRouter