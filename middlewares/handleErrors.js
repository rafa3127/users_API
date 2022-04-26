const errorDir = {
    "MISSING_DATA": {statusCode: 400, msg: "Missing Data"},
    "MISSING_FIRSTNAME": {statusCode: 400, msg: "Missing FirsName"},
    "MISSING_LASTNAME": {statusCode: 400, msg: "Missing LastName"},
    "MISSING_DNI": {statusCode: 400, msg: "Missing DNI"},
    "MISSING_GENDER": {statusCode: 400, msg: "Missing Gender"},
    "NOT_VALID_GENDER": {statusCode: 400, msg: "Not Valid Gender"},
    "MISSING_STATUS": {statusCode: 400, msg: "Missing Status"},
    "NOT_VALID_STATUS": {statusCode: 400, msg: "Not Valid Status"},
    "MISSING_PASSWORD": {statusCode: 400, msg: "Missing Password"},
    "MISSING_USERNAME": {statusCode: 400, msg: "Missing User Name"}, 
    "USERNAME_EXIST": {statusCode: 400, msg: "user name is already exist"}, 
    "DNI_EXIST": {statusCode: 400, msg: "there is an account with this DNI"}, 
    "NOT_TOKEN": {statusCode: 401, msg:"no token in the request"},
    "JWT_ERROR": {statusCode: 401, msg:"It not was possible get the authorization token"},
    "JWT_NOT_AUTH":{statusCode: 401, msg: "Not authorized"},
    "EXPIRED_TOKEN":{statusCode:401, msg:"Your session has expired"},
    "USER_NOT_FOUND":{statusCode:404, msg:"User not found"},
    "INVALID_LOGIN_DATA":{statusCode:400, msg:"Invalid user or password"},
    "DB_ERROR":{statusCode:500, msg:"The Database is not responding"},
}

const handleErrors = (error,request, response, next)=>{
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    let err = errorDir[error.message] || error.message
    console.log(err)
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    response.status(err.statusCode||500).json({type: "error", msg: err.msg || "Unknown Error", data: null} ).end()
}

export {handleErrors,errorDir}