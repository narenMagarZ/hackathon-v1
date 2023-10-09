import bcrypt from 'bcryptjs'


async function compareHash(str,hash){
     return await bcrypt.compare(str,hash)
}

export default compareHash