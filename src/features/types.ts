// USER TYPES

export namespace UserTypes {
    export type User = {
        username: string,
        inventory: Array<GameTypes.GameItem>,
        selectedItems: Array<GameTypes.GameItem>,
        money: number,
        character: string,
    }
    export type BattleUser = {
        username: string,
        selectedItems: Array<GameTypes.GameItem>,
        gold: number,
        money: number,
        health: number,
        message: string,
        character: string
    }
    export type OnlineUser = {
        username: string,
        status: string,
        socketId: string,
        character: string
    }
}

// GAME TYPES

export namespace GameTypes {
    export type GameItem = {
        type: string,
        image: string,
        background: string,
        hp?: number,
        tier?: string,
        damage?: {
            min: number,
            max: number
        },
        effectsSlots?: number,
        effects?: EffectType[]
        armourPoints?: number
        maxGold?: number,
        id: number
    }
    export type EffectType = {
        name: string,
        probability: number
    }
    export type DefaultGeneration = {
        image: string,
        type: string
    }

    export type Character = {
        image: string,
        isTaken: boolean
    }
}

// DATA TYPES

export namespace DataTypes {
    export type InvitationReceived = {
        from: UserTypes.OnlineUser,
        to: string,
        roomName: string
    }

    export type BattleCommunicationData = {
        roomName?: string,
        first: UserTypes.BattleUser,
        second: UserTypes.BattleUser,
        message?: string,
        damage?: number
    }

    export type CriticalCaseEvent = {
        state: boolean,
        message?: string
    }

    export type InvitationData = {
        state: boolean;
        data?: InvitationReceived
    }
}

// REDUX TYPES

export namespace ReduxTypes {
    export type ReduxUsers = {
        users: {
            myUser: UserTypes.User
            onlineUsers: Array<UserTypes.OnlineUser>,
            userInBattleOne: UserTypes.BattleUser,
            userInBattleTwo: UserTypes.BattleUser
        }
    }
    export type ReduxOtherStates = {
        otherStates: {
            invitationModal: {state: boolean, data: DataTypes.InvitationReceived},
            isBattleWon: {state: boolean, message: string},
            hasUserLeft: {state: boolean, message: string},
            roomName: string,
            attacker: string,
            attackTime: number
        }
    }
    export type ReduxErrorStates = {
        errors: {
            error?: string
        }
    }
}







