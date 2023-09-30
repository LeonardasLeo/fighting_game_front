import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: 'errorSlice',
    initialState: {
        homeScreenError: ''
    },
    reducers: {
        updateError: (state, action) => {
            state.homeScreenError = action.payload
        }
    }
})

export const {updateError} = errorSlice.actions

export default errorSlice.reducer