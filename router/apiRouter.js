import express from 'express'
import {getSoilData} from '../controller/index.js'
import {appError} from '../utils/index.js'
const apiRouter = express.Router()



apiRouter.get('/soildata',getSoilData)

export default apiRouter