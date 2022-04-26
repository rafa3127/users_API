import * as express from "express"
import bcrypt from "bcrypt"
import {User} from "../database/models/User.js"
import jsonwebtoken from "jsonwebtoken"

const loginRouter = express.Router()
const jwt = jsonwebtoken

loginRouter.post('/', async (request, response, next)=>{
    try{
        const {username, password} = request.body
        const user = await User.findOne({username})
        const valid = user === null ? false : await bcrypt.compare(password, user.passwordHash)
        if(!valid) throw Error("INVALID_LOGIN_DATA")
        const userForToken = {
            id: user._id,
            exp: Date.now() + (7*24*60*60*1000)
        }
        const token = jwt.sign(userForToken, process.env.JWT_SECRET_WORD)
        const result = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "dni": user.dni,
            "gender": user.gender,
            "phone": user.phone,
            "status": user.status,
            "userName": user.userName,
            token
        }
        response.status(200).json({type: "success", data: result, msg: null})
    }catch(err){
        next(err)
    }

})

export {loginRouter}