import { appError, verifyJwt } from "../utils/index.js"
import UserService from '../services/user-service.js'


async function auth(req,res,next){
     try{
          const {token} = req.signedCookies
          const jwtPayload = verifyJwt(token)
          const {id} = jwtPayload
          const user = await new UserService().getUser(id)
          if(user){
               req.user = {
                    id:user.id,
                    name:user.firstName+' '+user.lastName
               }
               next()
          }
          else return next(new appError(401,"Unauthorized"))
     }
     catch(err){
          console.error(err)
          return next(new appError(500,err.message))
     }
}

export default auth