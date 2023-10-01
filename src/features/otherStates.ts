import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataTypes} from "./types.ts";

const falseState: DataTypes.InvitationData = {
    state: false,
    data: undefined
}

const falseCriticalEvent: DataTypes.CriticalCaseEvent = {
    state: false,
    message: undefined
}

type OtherState = {
    invitationModal?: DataTypes.InvitationData;
    isBattleWon?: DataTypes.CriticalCaseEvent;
    hasUserLeft?: DataTypes.CriticalCaseEvent;
    roomName?: string,
    attacker?: string,
    attackTime?: number
}

const initialState: OtherState = {
    invitationModal: falseState,
    isBattleWon: falseCriticalEvent,
    hasUserLeft: falseCriticalEvent,
    roomName: '',
    attacker: '',
    attackTime: 20
} 

const otherStatesSlice = createSlice({
    name: 'otherStatesSlice',
    initialState,
    reducers: {
        updateInvitationModal: (state, action: PayloadAction<DataTypes.InvitationData>) => {
            state.invitationModal = action.payload
        },
        updateBattleWon: (state, action: PayloadAction<DataTypes.CriticalCaseEvent>) => {
            state.isBattleWon = action.payload
        },
        updateHasUserLeft: (state, action: PayloadAction<DataTypes.CriticalCaseEvent>) => {
            state.hasUserLeft = action.payload
        },
        updateRoomName: (state, action: PayloadAction<string>) => {
            state.roomName = action.payload
        },
        updateAttacker: (state, action: PayloadAction<string>) => {
            state.attacker = action.payload
        },
        updateAttackTime: (state, action: PayloadAction<number>) => {
            state.attackTime = action.payload
        }
    }
})

export const {
    updateInvitationModal,
    updateBattleWon,
    updateHasUserLeft,
    updateRoomName,
    updateAttacker,
    updateAttackTime
} = otherStatesSlice.actions

export default otherStatesSlice.reducer