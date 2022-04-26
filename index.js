import dotenv from "dotenv"
import * as mongo from "./database/mongo.js"
import cors from "cors"
import Express from "express"
import {notFound} from "./middlewares/notFound.js"
import {handleErrors} from "./middlewares/handleErrors.js"
import {usersRouter} from "./controllers/users.js"
import {loginRouter} from "./controllers/login.js"

const app = Express()

dotenv.config()
mongo.default.connectDB()


app.use(cors())
app.use(Express.json())

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.use(handleErrors)
app.use(notFound)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("------------------------------")
    console.log(`server running. Port ${PORT}`)
})
