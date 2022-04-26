import * as express from "express"
import jsonwebtoken from "jsonwebtoken"
import {User} from "../database/models/User.js"

const jwtValidation = express.Router()

jwtValidation.use(async (request, response,next) =>{
    try{
        let auth = request.get('authorization')
        if(!auth){
            throw Error("NOT_TOKEN")
        }
        auth = auth.split(" ")
        let token = ""
        let decodeToken = {}
        if(auth[0].toLowerCase() === "bearer"){
            token = auth[1]
        }
        
        decodeToken =  jsonwebtoken.verify(token, process.env.JWT_SECRET_WORD)
        
    
        if(!token === "" && !decodeToken.id) throw Error("JWT_NOT_AUTH")
    
        
        const user = await User.findById(decodeToken.id)
        if(!user) throw Error("JWT_NOT_AUTH")
        if(decodeToken.exp <= Date.now()) throw Error("EXPIRED_TOKEN")
        next()
    }catch(err){
        next(err)
    }
})

export {jwtValidation}