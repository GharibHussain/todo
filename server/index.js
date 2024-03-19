// use environment variables
require('dotenv').config()
//console.log(process.env)
const express = require('express')
const cors = require('cors')


const todoRouter = require('./routes/todo.js')

const app = express()
app.use(cors())
app.use(express.json())
// define that express can read parameters from url address
app.use(express.urlencoded({extended: false}))

// router
app.use('/', todoRouter)

const port = process.env.PORT 

app.listen(port)