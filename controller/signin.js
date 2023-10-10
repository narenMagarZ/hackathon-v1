import { appError, compareHash, generateJwt } from "../utils/index.js"
import joi from 'joi'
import UserService from '../services/user-service.js'
async function signin(req,res,next){
     const {error,value}=joi.object({
          phoneNumber:joi.string().required(),
          password:joi.string().required()
     }).validate(req.body)
     if(error){
          return next(new appError(400,error.message))
     }
     const {phoneNumber,password} = value
     try{
          const user = await new UserService().getUserByPhoneNumber(phoneNumber)
          if(!user){
               return next(new appError(404,"User not found"))
          }
          const isPasswordMatched = await compareHash(password,user.password)
          if(isPasswordMatched){
               res.cookie("token",generateJwt({
                    id:user.id
               }),{
                    maxAge:6.048e+8,
                    httpOnly:true,
                    signed:true
               })
               return res.status(200).json({
                    status:"success",
                    message:"Signin successfully"
               })
          }else {
               return next(new appError(401,"Password does not match"))
          }
     }
     catch(err){
          console.error(err)
          return next(new appError(500,err.message))
     }
}

export default signin