import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3001/api'
})

async function fetchWorkouts() {
    return await http.get('/workouts/')
}

function deleteWorkout(_id) {
    return http.delete(`/workouts/${_id}`)
        .then(response => response.data)
        .catch(error => {
            throw error;
        })
}

function createWorkout(workout) {
    return http.post('/workouts', workout)
        .then(response => response)
        .catch(error => {
            throw error;
        })
}

export { fetchWorkouts, deleteWorkout, createWorkout };
