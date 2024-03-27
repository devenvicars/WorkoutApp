import Workout from '../models/WorkoutModel.js'
import mongoose from 'mongoose'

//! if you want to filter your find results, you can pass a property name and value to the find method

//!.sort() will sort the results in ascending order by default. To sort in descending order, you can pass the property name and -1 to the sort method 

// GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    console.log(workouts)
    res.status(200).json(workouts)
}

// GET a single workout
const getWorkout = async (req, res) => {
    //get the id from the request params and store it in a variable 
    const { id } = req.params

    // check if the id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid workout id" })
    }
    // check if the workout exists and return it
    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: "No workout 🏋️ with that id found!" })
    }
    res.status(200).json(workout)

}

// POST a workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return (
            res.status(400).json({ error: 'Please fill in all fields', emptyFields })
        )
    }
    // add document to the database collection
    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// DELETE a workout
const deleteWorkout = async (req, res) => {

    // get the id from the request params
    const { id } = req.params

    // validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid workout id" })
    }

    // find the workout by id and delete it
    // mongoDB will return the deleted workout
    // mongoDB will return null if no workout is found
    const workout = await Workout.findOneAndDelete({ _id: id })
    // validate if the workout was found and deleted
    if (!workout) {
        return res.status(400).json({ error: "No workout 🏋️ with that id found!" })
    }
    // return success status and the deleted workout
    res.status(200).json(workout)
}

// UPDATE a workout
const updateWorkout = async (req, res) => {

    // get the id from the request params
    const { id } = req.params

    // validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No workout 🏋️ with that id found!" })
    }
    // find the workout by id and update it
    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })

    // validate if the workout was found and updated
    if (!workout) {
        return res.status(400).json({ error: "No workout 🏋️ with that id found!" })
    }

    // return success status and the updated workout
    res.status(200).json(workout)
}

// export the methods defined above
export {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}
