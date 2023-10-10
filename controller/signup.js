import { appError, generateJwt, hash } from "../utils/index.js"
import joi from 'joi'
import UserService from '../services/user-service.js'
async function signup(req,res,next){
     console.log(req.body)
     const {error,value}=joi.object({
          firstName:joi.string().required(),
          lastName:joi.string().required(),
          email:joi.string(),
          password:joi.string().required(),
          confirmPassword:joi.ref('password'),
          phoneNumber:joi.string().required(),
          province:joi.string()
          .allow("Karnali","Gandaki","Koshi","Bagmati","Sudurpashchim","Lumbini")
          .required()
     }).validate(req.body)
     if(error){
          return next(new appError(400,error.message))
     }
     try{
          const hashedPassword = await hash(value.password)
          const {confirmPassword:undefined,...newUserInfo} = value
          const newUser = await new UserService().createUser({
               ...value,
               password:hashedPassword
          })
          const user = {
               id:newUser.id
          }
          res.cookie('token',generateJwt(user),{
               maxAge:6.048e+8,
               httpOnly:true,
               signed:true
          })
          return res.status(200).json({
               status:"success",
               message:"User created successfully"
          })

     }
     catch(err){
          console.error(err)
          return next(new appError(500,err.message))
     }
}

export default signup