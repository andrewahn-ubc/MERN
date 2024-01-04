require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./backend/routes/workouts')

// Tells the server to look for a build of the React app (for Heroku deployment)
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

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

// Creates a subpath specifically for API calls since our API calls will use the same URL as our frontend.
const usersRouter = require('./routes/user');
app.use('/api/users', usersRouter);
const friendsRouter = require('./routes/friend');
app.use('/api/friends', friendsRouter);
