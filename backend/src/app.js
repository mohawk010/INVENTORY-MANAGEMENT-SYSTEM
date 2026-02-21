const express = require("express")
const ApiError = require("./utilities/ApiError")
const ErrorHandler = require("./middlewares/ErrorHandler")

const app = express()
const cors = require("cors")
const morgan = require("morgan")
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({extended:false}))

app.use("/api/v1",require("./routes"))

app.use("/{*path}",(req,res)=>{
    throw new ApiError(404, "Page Not Found")
})

app.use(ErrorHandler)

module.exports = app
