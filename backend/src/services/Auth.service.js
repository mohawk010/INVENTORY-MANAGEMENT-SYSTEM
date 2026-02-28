const httpStatus = require("http-status");
const { UserModel, ProfileModel } = require("../models");
const ApiError = require("../utilities/ApiError");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utilities/Tokens.uttils");


class AuthService{
    static async RegisterUser(body){

      const{email,password,name} = body

        const checkExist = await UserModel.findOne({email})
        if(checkExist){
            throw new ApiError(httpStatus.BAD_REQUEST,"User Already Exist")
             return
        }



        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = await UserModel.create({
            email, password: hashedPassword, name
        })

        await ProfileModel.create({
            user:user._id
        })
        return {
            msg:"User Register Successfully",
            token:''
        }
        
    
    }
    static async LoginUser(body){
        const{email,password} = body
        const checkExist = await UserModel.findOne({email})
        if(!checkExist){
            throw new ApiError(httpStatus.BAD_REQUEST,"User Not Registered")
             return
        }
       
        const isPasswordValid = bcrypt.compareSync(password, checkExist.password)
        if(!isPasswordValid){
            throw new ApiError(httpStatus.BAD_REQUEST,"Invalid Credentials")
        }
        const token = generateToken(checkExist)
        return {
            msg:"User Login Successfully",
            name: checkExist.name,
            token
        }
    }
    static async ProfileService(user_id){
    
         const checkExist = await UserModel.findById(user_id).select("name email")
        if(!checkExist){
            throw new ApiError(httpStatus.BAD_REQUEST,"User Not Found")
             return
        }
        return {
            msg:"Data Fetched Successfully",
            user:checkExist
           
        }
    }
}



module.exports = AuthService 