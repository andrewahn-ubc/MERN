require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// starts up the express app
const app = express()

// middleware
// the line below checks if any data is being sent to the server 
// and if there is, it attaches that data to the "req" object! 
app.use(express.json())
    
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests through a certain port number
        app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

