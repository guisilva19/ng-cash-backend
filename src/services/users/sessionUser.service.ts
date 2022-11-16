import { compare } from "bcrypt"
import AppDataSource from "../../data-source"
import { Users } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUserCreateAndSession } from "../../interfaces"
import jwt from "jsonwebtoken"

const sessionUserService = async ({ username, password }: IUserCreateAndSession) => {
    const userRepository = AppDataSource.getRepository(Users)

    const users = await userRepository.find()
    const user = users.find(user => user.username === username)

    if (!user) {
        throw new AppError('Username or password invalid', 403)
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
        throw new AppError('Username or password invalid', 403)
    }

    const token = jwt.sign({ user }, process.env.SECRET_KEY as string, { expiresIn: '24h' })

    return token
}

export default sessionUserService