// import User from '../models/UserModel.js'

const loginUser = async (req, res) => {
    res.json({ message: 'login user' })
}

const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        res.status(200).json({ email, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export {
    signupUser,
    loginUser
};