import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CriticalCaseEvent, InvitationData} from "./types.ts";

const falseState:InvitationData = {
    state: false,
    data: undefined
}

const falseCriticalEvent: CriticalCaseEvent = {
    state: false,
    message: undefined
}

type OtherState = {
    invitationModal?: InvitationData;
    isBattleWon?: CriticalCaseEvent;
    hasUserLeft?: CriticalCaseEvent;
    roomName?: string,
    attacker?: string
}

const initialState: OtherState = {
    invitationModal: falseState,
    isBattleWon: falseCriticalEvent,
    hasUserLeft: falseCriticalEvent,
    roomName: '',
    attacker: ''
} 

const otherStatesSlice = createSlice({
    name: 'otherStatesSlice',
    initialState,
    reducers: {
        updateInvitationModal: (state, action: PayloadAction<InvitationData>) => {
            state.invitationModal = action.payload
        },
        updateBattleWon: (state, action: PayloadAction<CriticalCaseEvent>) => {
            state.isBattleWon = action.payload
        },
        updateHasUserLeft: (state, action: PayloadAction<CriticalCaseEvent>) => {
            state.hasUserLeft = action.payload
        },
        updateRoomName: (state, action: PayloadAction<string>) => {
            state.roomName = action.payload
        },
        updateAttacker: (state, action: PayloadAction<string>) => {
            state.attacker = action.payload
        }
    }
})

export const {
    updateInvitationModal,
    updateBattleWon,
    updateHasUserLeft,
    updateRoomName,
    updateAttacker
} = otherStatesSlice.actions

export default otherStatesSlice.reducer