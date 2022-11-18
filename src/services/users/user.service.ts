import AppDataSource from '../../data-source';
import { Users } from '../../entities/user.entity';
import { AppError } from './../../errors/appError';
const userService = async (id: string) => {

    if (!id) {
        throw new AppError('Error id')
    }

    const userRepository = AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({ id })

    if(!user) {
        throw new AppError('User not found', 404)
    }

    return user

}

export default userService