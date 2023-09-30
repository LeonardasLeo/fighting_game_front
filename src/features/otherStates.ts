import { createSlice } from '@reduxjs/toolkit';
import {invitationReceived} from "./types.ts";

const otherStatesSlice = createSlice({
    name: 'otherStatesSlice',
    initialState: {
        invitationModal: {state: false, data: {} as invitationReceived},
        isBattleWon: {state: false, message: '' as string},
        hasUserLeft: {state: false, message: '' as string}
    },
    reducers: {
        updateInvitationModal: (state, action) => {
            state.invitationModal = action.payload
        },
        updateBattleWon: (state, action) => {
            state.isBattleWon = action.payload
        },
        updateHasUserLeft: (state, action) => {
            state.hasUserLeft = action.payload
        }
    }
})

export const {
    updateInvitationModal,
    updateBattleWon,
    updateHasUserLeft
} = otherStatesSlice.actions

export default otherStatesSlice.reducer