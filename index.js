require('dotenv').config()
const port = process.env.PORT || 5000;

const express = require('express')
const favicon = require('express-favicon');
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/route1')
const path = require("path")

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

app.use(favicon('./client/public/favicon.ico'));
    
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

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
