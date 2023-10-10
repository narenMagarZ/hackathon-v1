import express from 'express'
import auth from '../middleware/auth.js'
import UserService from '../services/user-service.js'
import redis from '../config/redis.js'
import axios from 'axios'
import {
     getClimate,
     getWeatherFromCode,
     getSuggestedCrops
} from '../utils/index.js'
const viewRouter = express.Router()


viewRouter.get('/',(req,res)=>{
     res.render("index.ejs")
})
viewRouter.get('/signup',(req,res)=>{
     res.render("signup.ejs")
})

viewRouter.get('/signin',(req,res)=>{
     res.render("signin.ejs")
})

viewRouter.get('/profile',auth,(req,res)=>{
     const user = {
          firstName:"naren",
          lastName:"magar",
          province:"Karnali",
          email:"nare@gmail.com",
          phoneNumber:"9822406053",
          path:req.path
     }
     res.render("profile.ejs",{user})
})
viewRouter.get('/yield',auth,async (req,res)=>{
     const {id} = req.user
     const yieldCrops = await new UserService().getYieldCrops(id)
     yieldCrops.map((crop)=>{
          const date = new Date(crop.harvestStartDate)
          const year = date.getFullYear()
          const month = String(date.getMonth()+1).padStart(2,'0')
          const day = String(date.getDate()).padStart(2,'0')
          const date1 = new Date(crop.harvestStartDate)
          const year1 = date1.getFullYear()
          const month1 = String(date1.getMonth()+1).padStart(2,'0')
          const day1 = String(date1.getDate()).padStart(2,'0')
          crop.harvestStartDate = `${year}-${month}-${day}`,
          crop.harvestEndDate = `${year1}-${month1}-${day1}`
     })
     return res.render("yield.ejs",{yieldCrops})
})
viewRouter.get('/yield/timeline',auth,async (req,res)=>{
     const {id}=req.user
     const {crop} = req.query
     console.log(req.query)
     try{
          const yieldCropsDetail = await new UserService().getYieldCropsInDetail(id,crop)
          const harvestTimeline = []
          const title = ["","Harvest start","Irrigation","Pest control","Fertilization","Weed management","Harvest end"]
          Object.keys(yieldCropsDetail[0]).forEach((key,i)=>{
               if(i>0 && i<7){
                    harvestTimeline.push({
                         title:title[i],
                         status: new Date().getTime() - new Date(yieldCropsDetail[0][key]).getTime() > 0 ? "pass":"",
                         value:extractDate(yieldCropsDetail[0][key])
                    })
               }
          })
          return res.render("timeline.ejs",{data:{
               crop:yieldCropsDetail[0].name,
               timeline:harvestTimeline
          }})
     }
     catch(err){
          console.error(err)
          // return error page
     }

})

viewRouter.get('/procedure',(req,res)=>{
     const {crop} = req.query
     return res.render("procedure.ejs",{crop})
})

const extractDate =(date)=>{
     const date1 = new Date(date)
     const year = date1.getFullYear()
     const month = String(date1.getMonth()+1).padStart(2,'0')
     const day = String(date1.getDate()).padStart(2,'0')
     return `${year}-${month}-${day}`
}
export default viewRouter