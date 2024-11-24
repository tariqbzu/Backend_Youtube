import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path: './env'
})
connectDB()

.then( () =>{
    app.listen(process.env.PORT || 6000, () =>{
        console.log(`Server is Runing at Port: ${process.env.PORT}`);
    })
    app.on("Error", (error)=>{
        console.log("Error :", error);
    })
})
.catch( (error) =>{
    console.log("DB Failed to Connect !!!", error)
})