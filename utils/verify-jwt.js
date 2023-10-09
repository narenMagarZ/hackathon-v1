import jwt from 'jsonwebtoken'

function verifyJwt(token){
     return jwt.verify(token,process.env.JWT_SECRET_KEY)
}

export default verifyJwt