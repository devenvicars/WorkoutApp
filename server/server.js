import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbConnect from './config/mongoose.config.js';
import workoutRoutes from './routes/workoutRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json(), cors())
dotenv.config();
dbConnect();

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} 🌾`)
})



// dotenv package is used to read the .env file and make the environment variables available to the application
// require('dotenv').config() is used to load the environment variables from the .env file
// start the server using express
// cors package is used to allow cross-origin requests, this is needed because the server and client are running on different ports
// import mongoose to connect to the MongoDB database
// import the workouts routes from the routes folder
// create an express app
// middleware is used to process the request before it is passed to the route handler
// app.use(express.json()) is middleware to parse the request body as JSON
// app.use(cors()) is middleware to allow cross-origin requests
// can be chained because they are both middleware functions from express
// middleware to log the request method and path, the "next" argument is required to pass the request to the next middleware function
// define route handler
// grabs the routes defined in the workouts.routes.js file for use in the app
// connect to the MongoDB database using mongoose and abstracted environment variable
// catch any errors connecting to the database

