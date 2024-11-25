import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))     // .use method for midleware and configuration processes
app.use(express.json({limit:"16kb"}))   // by this we accept the JSON type data
app.use(express.urlencoded({extended:true ,limit:"16kb"}))  // when we get data from url then some issue occurs
                                                            //  that are space issue and others like that
                                                            //  extended means ap object ke inside bhi object use ker sakty ho
app.use(express.static("public"))           // sometime we store file folder like our public folder in it we have assets
app.use(cookieParser())

// Routes Imports
import userRouter from './routes/user.routes.js'

// Routes Declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register


export {app}