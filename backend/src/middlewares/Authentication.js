const httpStatus = require("http-status");
const ApiError = require("../utilities/ApiError");
const { validateToken } = require("../utilities/Tokens.uttils");


const Authentication = (req,res,next) => {
 try {
    const headers = req.headers['authorization'] || ''

     if(!headers || !headers.startsWith('Bearer ')){
                throw new ApiError(httpStatus.UNAUTHORIZED,"Please Login First")

              }

              const auth_token = headers.split(' ')[1]

              if(!auth_token){
                   throw new ApiError(httpStatus.UNAUTHORIZED,"Please Provide Valid Token")
              }

              const data = validateToken(auth_token)
              req.user_id = data.userid
              next()
 } catch (error) {
             next(error)   
 }   
}

module.exports = Authentication
