import express from 'express'
import {viewRouter,apiRouter} from './router/index.js'
import cookieParser from 'cookie-parser'
import * as db from './config/db.js'
const app = express()


app.set('view engine','ejs')

app.use(cookieParser(process.env.SECRET_KEY))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
     extended:false
}))
app.use('/api',apiRouter)
app.use('/',viewRouter)

app.use((err,req,res,next)=>{
     const code = err.code
     const message = err.message
     return res.status(code).json({
          error:message
     })
})
export default app
