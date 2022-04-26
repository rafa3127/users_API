import bcrypt from "bcrypt"
import * as express from "express"
import {User} from "../database/models/User.js"
import {jwtValidation} from "../middlewares/jwt.js"
import {validateUserExist, validateUserDataIsOk, validatePassword} from "../validators/validators.js"

const usersRouter = express.Router()

usersRouter.post("/",async (request,response,next)=>{
    try{
        let {password, ...data} = request.body
        //Validations
        if(!data) throw new Error("MISSING_DATA")
        let userExist = await validateUserExist(data)
        let userDataIsOk = await validateUserDataIsOk(data, password)
        let passwordIsOk = await validatePassword(password)
        if(userExist && userDataIsOk){
            //Creating user
            let user = {passwordHash:bcrypt.hashSync(password,10) , ...data}
            let result = await User.create(user)
            response.status(201).json({type: "success", data: result, msg: null})
        }
    }catch(err){
        next(err)
    }
        
})

usersRouter.get("/", jwtValidation)
usersRouter.get("/", async (request,response,next) =>{
    try{
        const filterGender = request.query.gender
        const filterStatus = request.query.status
        let query = {}
        if(filterGender){
            query.gender = filterGender
        }
        if(filterStatus){
            query.status = filterStatus
        }
        let result = await User.find(query)
        if(result.length !== 0){
            response.status(200).json({type: "success", data: result, msg: null}).end()
        }else{
            response.status(204).json({type: "success", data: result, msg: "Not users"}).end()
        }
    }catch(err){
        next(err)
    }
})
usersRouter.get("/:id", jwtValidation)
usersRouter.get("/:id", async (request, response, next) =>{
    try{
        const id = request.params.id
        let user = await User.findById(id)
        if(user){
            response.json({type: "success", data: user, msg: null}).end()
        }else{
            throw Error("USER_NOT_FOUND")
        }
    }catch(err){
        next(err)
    }
})

usersRouter.delete('/:id', jwtValidation)
usersRouter.delete("/:id",async (request,response,next)=>{
    try{
        const id = request.params.id
        let user = await User.findByIdAndDelete(id)
        if(!user){
            throw Error("USER_NOT_FOUND")
        }
        response.status(204).json({type: "success", data: null, msg: "user deleted"}).end()
    }catch(err){
        next(err)
    }
    
})


usersRouter.put("/:id",jwtValidation)
usersRouter.put("/:id", async (request, response,next) =>{
    try{
        const id = request.params.id
        const updateInfo = request.body

        //Validations
        if(!updateInfo)throw new Error("MISSING_DATA")
        let userDataIsOk = await validateUserDataIsOk(updateInfo, "123")
        if(userDataIsOk){
            let user = await User.findOneAndUpdate(id,{
                    "firstName": updateInfo.firstName,
                    "lastName": updateInfo.lastName,
                    "dni": updateInfo.dni,
                    "gender": updateInfo.gender,
                    "phone": updateInfo.phone,
                    "status": updateInfo.status,
                    "userName": updateInfo.userName
                }, {new:true})
            response.status(200).json({type: "success", data: user, msg: "user updated"}).end()
        }else{
            throw Error()
        }
    }catch(err){
        next(err)
    }
})



    


export {usersRouter}