import mongoose from "mongoose"

const strToObjId=(id)=>new mongoose.Types.ObjectId(id)

export default strToObjId