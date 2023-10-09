import express from 'express'
import {viewRouter,apiRouter} from './router/index.js'


const app = express()


app.set('view engine','ejs')

app.use('/api',apiRouter)
app.use('/',viewRouter)
app.use(express.static('public'))
export default app
