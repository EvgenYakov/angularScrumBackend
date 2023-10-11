const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()


const connectDB = require('./config/db')
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')
const projectRouter = require('./routes/project')
const sprintRouter = require('./routes/sprint')

const {errorHandler} = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 3001
const app = express()


connectDB();
app.use(bodyParser.json())
app.use(cookieParser())


app.use('/auth',authRouter)
app.use('/task',taskRouter)
app.use('/project',projectRouter)
app.use('/sprint',sprintRouter)

app.use(errorHandler)

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))