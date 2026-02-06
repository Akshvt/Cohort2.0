const express =  require('express')
const authRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')

const app = express()

app.use("/api/auth", authRouter) //calling should be done using this prefix in the url;
app.use(express.json())
app.use(cookieParser())

module.exports = app