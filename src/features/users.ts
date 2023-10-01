import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType, OnlineUser, BattleUser} from "./types.ts";

type userState = {
    myUser?: UserType;
    onlineUsers: OnlineUser[];
    userInBattleOne?: BattleUser;
    userInBattleTwo?: BattleUser;
}

const initialState: userState = {
    myUser: undefined,
    onlineUsers: [],
    userInBattleOne: undefined,
    userInBattleTwo: undefined
}

const usersSlice = createSlice({

    name: 'usersSlice',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserType>) => {
            state.myUser = action.payload
        },
        updateOnlineUsers: (state, action: PayloadAction<OnlineUser[]>) => {
            state.onlineUsers = action.payload
        },
        updateBattleUserOne: (state, action: PayloadAction<BattleUser>) => {
            state.userInBattleOne = action.payload
        },
        updateBattleUserTwo: (state, action: PayloadAction<BattleUser>) => {
            state.userInBattleTwo = action.payload
        },

    }
})

export const {
    updateUser,
    updateOnlineUsers,
    updateBattleUserOne,
    updateBattleUserTwo
} = usersSlice.actions

export default usersSlice.reducer