import express from 'express'

// controller functions
import { loginUser, signupUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)

export default router

