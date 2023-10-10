import UserService from "../services/user-service.js";
import { appError } from "../utils/index.js";

async function getYieldedCrops(req,res,next){
     const {id} = req.user
     try{
          const yieldedCrops = await new UserService().getYieldCrops(id)
          console.log(yieldedCrops)
          return res.status(200).json({
               status:"success",
               
          })
     }
     catch(err){
          console.error(err)
          return next(new appError(500,err.message))
     }
}

export default getYieldedCrops