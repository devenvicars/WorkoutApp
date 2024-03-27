import { useEffect } from 'react';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// services
import { fetchWorkouts } from '../services/workoutServices.js';

const Home = () => {

    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const getAllWorkouts = async () => {
            try {
                const response = await fetchWorkouts()
                dispatch({ type: 'SET_WORKOUTS', payload: response.data })
                console.log('Response from axios.get', response)
            } catch (error) {
                console.log('Error from axios.get', error)
            }
        }
        getAllWorkouts()
    }, [dispatch])

    return (
        <div className="home">
            <div className='workouts'>
                {workouts && workouts.map(workout => {
                    return (
                        <WorkoutDetails workout={workout} key={workout._id} />
                    )
                })}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;