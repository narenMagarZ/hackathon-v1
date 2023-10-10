import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
function verifyJwt(token){
     return jwt.verify(token,process.env.JWT_SECRET_KEY)
}

export default verifyJwt