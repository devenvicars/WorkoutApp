import { model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.statics.signup = async function (email, password) {

    if (!email || !password) {
        throw new Error("Email and Password are required")
    }
    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough")
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw new Error("Email already in use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user;

}

const User = model("User", UserSchema);
export default User;