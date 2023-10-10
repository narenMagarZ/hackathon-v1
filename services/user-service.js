import User from '../models/user.js'
import YieldCrops from '../models/yield-crops.js'
import strToObjId from '../utils/str-to-objid.js'
class UserService{
     async createUser(userInfo){
          const user = await new User(userInfo).save()
          return user
     }
     async getYieldCropsInDetail(userId,cropId){
          const yieldCropsDetail = await YieldCrops.aggregate([
               {
                    $match:{
                         userId:strToObjId(userId),
                         _id:strToObjId(cropId)
                    }
               },
               {
                    $project:{
                         _id:0,
                         name:1,
                         id:{
                              $toString:"$_id"
                         },
                         harvestStartDate:1,
                         harvestEndDate:1,
                         irrigation:1,
                         pestControl:1,
                         fertilization:1,
                         weedManagement:1
                    }
               }
          ])
          return yieldCropsDetail
     }
     async getYieldCrops(userId){
          const yieldCrops = await YieldCrops.aggregate([
               {
                    $match:{
                         userId:strToObjId(userId)
                    }
               },
               {
                    $project:{
                         _id:0,
                         id:{
                              $toString:'$_id'
                         },
                         harvestStartDate:1,
                         harvestEndDate:1,
                         name:1
                    }
               }
          ])
          return yieldCrops
     }
     async getYieldCropById(cropId){
          const yieldCrop = await YieldCrops.findById(cropId)
          return yieldCrop
     }
     async getUser(userId){
          const user = await User.findById(userId)
          return user
     }
     async getUserByPhoneNumber(phoneNumber){
          const user = await User.findOne({
               phoneNumber
          })
          return user
     }
     async createYield(userId,cropInfo){
          await new YieldCrops({
               userId:strToObjId(userId),
               ...cropInfo
          }).save()
     }
     
}

export default UserService