import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function generateJwt(user){
     return jwt.sign(user,process.env.JWT_SECRET_KEY,{
          expiresIn:'7d'
     })
}

export default generateJwt