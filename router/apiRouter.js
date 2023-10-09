import express from 'express'
import {getCropProcedure, getSoilData} from '../controller/index.js'
const apiRouter = express.Router()



apiRouter.get('/soildata',getSoilData)

apiRouter.get('/procedure',getCropProcedure)
export default apiRouter