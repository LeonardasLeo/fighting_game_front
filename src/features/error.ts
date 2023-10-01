import { createSlice } from '@reduxjs/toolkit';

type ErrorState = {
    error?: string
}

const initialState: ErrorState = {
    error: undefined
}

const errorSlice = createSlice({
    name: 'errorSlice',
    initialState,
    reducers: {
        updateError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const {updateError} = errorSlice.actions

export default errorSlice.reducer