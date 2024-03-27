import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// services
import { createWorkout } from '../services/workoutServices'

// create the form function and instantiate the state variables
const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // create the handleSubmit function to handle the form submission
    // create a new workout object with the user input
    // send the workout object to the server
    // the server expects the request body to be JSON
    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps }

        try {
            const response = await createWorkout(workout)
            console.log('Response from axios', response)
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('Workout added:', response.data)
            dispatch({ type: 'CREATE_WORKOUT', payload: response.data })
        }
        catch (error) {
            console.log('Error from axios', error)
            setError(error.response.data.error)
            setEmptyFields(error.response.data.emptyFields)
        }


        // axios.post('http://localhost:3001/api/workouts', JSON.stringify(workout), { headers: { 'Content-Type': 'application/json' } })
        //     .then(response => {
        //         console.log('Response from axios', response)
        //         setTitle('')
        //         setLoad('')
        //         setReps('')
        //         setError(null)
        //         setEmptyFields([])
        //         console.log('Workout added:', response.data)
        //         dispatch({ type: 'CREATE_WORKOUT', payload: response.data })
        //     })
        //     .catch(error => {
        //         console.log('Error from axios', error)
        //         setError(error.response.data.error)
        //         setEmptyFields(error.response.data.emptyFields)
        //     })

        // const response = await fetch('http://localhost:3001/api/workouts', {
        //     method: 'POST',
        //     body: JSON.stringify(workout),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // const json = await response.json()
        // console.log('Response from fetch', json)

        // if (!response.ok) {
        //     setError(json.error)
        //     setEmptyFields(json.emptyFields)
        // }
        // if (response.ok) {
        //     setTitle('')
        //     setLoad('')
        //     setReps('')
        //     setError(null)
        //     setEmptyFields([])
        //     console.log('Workout added:', json)
        //     dispatch({ type: 'CREATE_WORKOUT', payload: json })
        // }
    }

    // create the form for users to input their workout details 
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title</label>
            {/* the onChange event handler takes the user input and stores it as a new copy of state. */}
            <input type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in lbs): </label>
            <input type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}

            />

            <label>Number of Reps:</label>
            <input type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}

            />

            <button type='submit'>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

export default WorkoutForm;