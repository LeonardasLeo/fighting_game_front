export type gameItem = {
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
    effects?: effectType[]
    armourPoints?: number
    maxGold?: number
}

export type effectType = {
    name: string,
    probability: number
}

export type defaultGeneration = {
    image: string,
    default: boolean
}


export type userType = {
    username: string,
    inventory: Array<gameItem>,
    selectedItems: Array<gameItem>,
    money: number,
    character: string
}

export type battleUser = {
    username: string,
    selectedItems: Array<gameItem>,
    gold: number,
    money: number,
    health: number,
    message: string,
    character: string
}

export type onlineUser = {
    username: string,
    status: string,
    socketId: string,
    character: string
}

export type battleUserPayload = {
    first: battleUser,
    second: battleUser
}

export type character = {
    image: string,
    isTaken: boolean
}

export type reduxUsers = {
    users: {
        myUser: userType
        onlineUsers: Array<onlineUser>,
        userInBattleOne: battleUser,
        userInBattleTwo: battleUser
    }
}

export type invitationReceived = {
    from: onlineUser,
    to: string,
    roomName: string
}

export type battleCommunicationData = {
    roomName?: string,
    first: battleUser,
    second: battleUser,
    message?: string
}

export type criticalCaseEvent = {
    state: boolean,
    message: string
}

export type reduxOtherStates = {
    otherStates: {
        invitationModal: {state: boolean, data: invitationReceived},
        isBattleWon: {state: boolean, message: string},
        hasUserLeft: {state: boolean, message: string}
    }
}
