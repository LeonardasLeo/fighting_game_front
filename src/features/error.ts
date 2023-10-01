import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
        updateError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})

export const {updateError} = errorSlice.actions

export default errorSlice.reducer