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


export type UserType = {
    username: string,
    inventory: Array<GameItem>,
    selectedItems: Array<GameItem>,
    money: number,
    character: string,
}

export type BattleUser = {
    username: string,
    selectedItems: Array<GameItem>,
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

export type Character = {
    image: string,
    isTaken: boolean
}

export type ReduxUsers = {
    users: {
        myUser: UserType
        onlineUsers: Array<OnlineUser>,
        userInBattleOne: BattleUser,
        userInBattleTwo: BattleUser
    }
}

export type InvitationReceived = {
    from: OnlineUser,
    to: string,
    roomName: string
}

export type BattleCommunicationData = {
    roomName?: string,
    first: BattleUser,
    second: BattleUser,
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

export type ReduxOtherStates = {
    otherStates: {
        invitationModal: {state: boolean, data: InvitationReceived},
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
