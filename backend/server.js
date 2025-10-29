import express from 'express'
import dotenv from 'dotenv/config'
import { connectDB } from './config/db.mjs'
import userRoutes from "./routes/user.routes.mjs"
import employeeRoutes from './routes/employee.routes.mjs'
import { errorHandler } from './middlewares/error.middleware.mjs'
import cors from 'cors'

const app = express()
const port = process.env.PORT
app.use(express.json())

app.use(cors())
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/employees", employeeRoutes)


app.use(errorHandler)
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running at port: ${port}`)
    })
})
// connectDB()
// app.listen(port, () => {
//     console.log(`server is running at port: ${port}`)
// })