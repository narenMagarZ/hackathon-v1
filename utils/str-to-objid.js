import mongoose from "mongoose"

const strToObjId=(id)=>mongoose.Types.ObjectId(id)

export default strToObjId