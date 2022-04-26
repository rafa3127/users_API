import "mongoose"
import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dni: String,
    gender: String,
    phone: String,
    status: String,
    passwordHash: String,
    userName: String
})

userSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

export {User}

