import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userType, onlineUser, battleUserPayload, battleUser} from "./types.ts";

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: {
        myUser: {},
        onlineUsers: [] as Array<onlineUser>,
        userInBattleOne: {} as battleUser,
        userInBattleTwo: {} as battleUser
    },
    reducers: {
        updateUser: (state, action: PayloadAction<userType>) => {
            state.myUser = action.payload
        },
        updateOnlineUsers: (state, action: PayloadAction<onlineUser[]>) => {
            state.onlineUsers = action.payload
        },
        updateBattleUsers: (state, action: PayloadAction<battleUserPayload>) => {
            state.userInBattleOne = action.payload.first
            state.userInBattleTwo = action.payload.second
        }
    }
})

export const {
    updateUser,
    updateOnlineUsers,
    updateBattleUsers
} = usersSlice.actions

export default usersSlice.reducer