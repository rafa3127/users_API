import {User} from "../database/models/User.js"
import {errorDir} from "../middlewares/handleErrors.js"

const validateUserExist = async (data) => {
    let user = await User.findOne({$or: [{"userName":data.userName}, {"dni":data.dni}]})
    if(!user) return true
    if(user.userName == data.userName){
        throw Error("USERNAME_EXIST")
    }
    if(user.dni == data.dni){
        throw Error("DNI_EXIST")
    }
}

const validateUserDataIsOk = (data) => {
    if(data.firstName == undefined || data.firstName ==""){
        throw Error("MISSING_FIRSTNAME")
    }else if(data.lastName == undefined || data.lastName == ""){
        throw Error("MISSING_LASTNAME")
    }else if(data.dni == undefined || data.dni == ""){
        throw Error("MISSING_DNI")
    }else if(data.gender == undefined || data.gender == ""){
        throw Error("MISSING_GENDER")
    }else if(data.gender !== "M" && data.gender !== "F"){
        throw Error("NOT_VALID_GENDER")
    }else if(data.status == undefined || data.status == ""){
        throw Error("MISSING_STATUS")
    }else if(data.status !== "active" && data.status !== "inactive" && data.status !== "pending"){
        throw Error("NOT_VALID_STATUS")
    }else if(data.userName == undefined || data.userName == ""){
        throw Error("MISSING_USERNAME")
    }else{
        return true
    }
}

const validatePassword = (password) =>{
    if(password == undefined || password == ""){
        throw Error("MISSING_PASSWORD")
    }
}

export {validateUserExist, validateUserDataIsOk, validatePassword}