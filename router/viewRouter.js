import express from 'express'

const viewRouter = express.Router()


viewRouter.get('/',(req,res)=>{
     res.render("index.ejs")
})
export default viewRouter