import { Accounts } from './../../entities/accounts';
import { Transactions } from './../../entities/transactions';
import AppDataSource from "../../data-source"
import { Users } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { ITransaction, IUser } from "../../interfaces"

const createTransactionService = async ({ value, username }: ITransaction, user: IUser) => {

    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()
    const userRecebe = users.find(user => user.username === username)

    if (!userRecebe) {
        throw new AppError('User not fount', 404)
    }

    if (!value) {
        throw new AppError('Value is missing')
    }

    const accountRepository = AppDataSource.getRepository(Accounts)

    await accountRepository.update( userRecebe.account.id,{
        balance: userRecebe.account.balance + value
    })

    await accountRepository.update( user.account.id,{
        balance: userRecebe.account.balance - value
    })
    
    const transactionRepository = AppDataSource.getRepository(Transactions)

    const transaction = transactionRepository.create({
        debited: user.account.id,
        credited: userRecebe.account.id,
        value
    })

    await transactionRepository.save(transaction)

    return transaction
}

export default createTransactionService