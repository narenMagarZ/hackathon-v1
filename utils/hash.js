import bcrypt from 'bcryptjs'

async function hash(str){
     const salt = await bcrypt.genSalt()
     const hashed = await bcrypt.hash(str,salt)
     return hashed
}

export default hash