import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import { deleteWorkout } from '../services/workoutServices'

// date fns
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        try {
            const response = await deleteWorkout(workout._id)
            dispatch({ type: 'DELETE_WORKOUT', payload: response })
        }
        catch (error) {
            console.log('Error from axios', error)
        }
    }

    return (
        <div className='workout-details'>
            <h4>{workout.title}</h4>
            <p><strong>Load (lbs): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}

export default WorkoutDetails;