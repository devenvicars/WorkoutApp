import express from 'express'

import { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js'

const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// export the router
export default router


// import express
// start the server using express
// import the workout controller methods
// creates an instance of the router
