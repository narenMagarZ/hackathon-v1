import express from 'express'

const apiRouter = express.Router()

apiRouter.get('/',(req,res)=>{
     return res.json({
          msg:"ok"
     })
})

export default apiRouter