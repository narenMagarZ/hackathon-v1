import jwt from 'jsonwebtoken'


function generateJwt(user){
     return jwt.sign(user,process.env.JWT_SECRET_KEY,{
          expiresIn:'7d'
     })
}

export default generateJwt