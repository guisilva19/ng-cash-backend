interface IUserCreateAndSession {
    username: string
    password: string
}

interface IUser {
    id: string
    username: string
    password: string
    account: {
        id: string
        value: number
    }
}

interface ITransaction {
    value: number
    username: string
}

export { IUser, ITransaction, IUserCreateAndSession }