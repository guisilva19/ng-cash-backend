import { hash } from "bcrypt"
import AppDataSource from "../../data-source"
import { Accounts } from "../../entities/accounts"
import { Users } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUserCreateAndSession } from "../../interfaces"


const createUserService = async ({ username, password }: IUserCreateAndSession) => {

    if (!password || !username) {
        throw new AppError('Username or password invalid')
    }

    const userRepository = AppDataSource.getRepository(Users)
    const accountRepository = AppDataSource.getRepository(Accounts)
    const users = await userRepository.find()
    const userExist = users.find(user => user.username === username)

    if (userExist) {
        throw new AppError('User exist', 401)
    }

    const account = accountRepository.create({
        balance: 100
    })
    await accountRepository.save(account)
    
    const passwordHash = await hash(password, 10)
    const newUser = userRepository.create({
        username,
        password: passwordHash,
        account: account
    })
    
    
    await userRepository.save(newUser)
    return newUser
}

export { createUserService }