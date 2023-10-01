import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserTypes} from "./types.ts";


type userState = {
    myUser?: UserTypes.User;
    onlineUsers: UserTypes.OnlineUser[];
    userInBattleOne?: UserTypes.BattleUser;
    userInBattleTwo?: UserTypes.BattleUser;
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
        updateUser: (state, action: PayloadAction<UserTypes.User>) => {
            state.myUser = action.payload
        },
        updateOnlineUsers: (state, action: PayloadAction<UserTypes.OnlineUser[]>) => {
            state.onlineUsers = action.payload
        },
        updateBattleUserOne: (state, action: PayloadAction<UserTypes.BattleUser>) => {
            state.userInBattleOne = action.payload
        },
        updateBattleUserTwo: (state, action: PayloadAction<UserTypes.BattleUser>) => {
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