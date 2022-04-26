import { config } from 'dotenv'
import mongoose from 'mongoose'

config()
// conexión
const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_DB_URI).then(()=>{
        console.log("--------------------")
        console.log(`Database conected`)
        console.log("--------------------")
    }).catch(err =>{
        console.log(err)
        throw Error("DB_ERROR")
    })
}

export default {connectDB}

