// initiate Mongoose
import { model, Schema } from 'mongoose'

const WorkoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Workout = model("Workout", WorkoutSchema);
export default Workout; 