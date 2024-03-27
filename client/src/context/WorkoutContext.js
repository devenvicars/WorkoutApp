import { createContext, useReducer } from 'react'

// create a context for the workouts
export const WorkoutsContext = createContext()

// useReducer is a hook that is used for state management, similar to useState, but it is used for more complex state management.

// this reducer could be moved to a separate folder specifically for reducers and imported here
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT': {
            return {
                workouts: state.workouts.filter(w => w._id !== action.payload._id)
            }
        }
        default:
            return state
    }
}

// create a provider component for the workouts. This will be used to wrap the entire application so that the workouts are available to all components
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    // return the provider component with the state and dispatch for use in the children components
    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )

}


