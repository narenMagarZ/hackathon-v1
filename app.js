import express from 'express'
import {viewRouter,apiRouter} from './router/index.js'


const app = express()


app.set('view engine','ejs')

app.use(express.static('public'))

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
