import { Accounts } from './../../entities/accounts';
import { Transactions } from './../../entities/transactions';
import AppDataSource from "../../data-source"
import { Users } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { ITransaction, IUser } from "../../interfaces"

const createTransactionService = async ({ value, username }: ITransaction, usernameCredit: string) => {
    
    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()
    const userCredit = users.find(user => user.username === username)
    
    const userDebit = users.filter(user => user.username === usernameCredit)[0]
    
    if (value > userDebit.account.balance) {
        throw new AppError('insufficient funds', 401)
    }
    
    if (!userCredit) {
        throw new AppError('User not fount', 404)
    }

    if (!value) {
        throw new AppError('Value is missing')
    }

    if (userDebit.id === userCredit.id) {
        throw new AppError('Unable to do the transaction for yourself', 401)
    }

    const accountRepository = AppDataSource.getRepository(Accounts)


    await accountRepository.update(userDebit.account.id, {
        balance: userDebit.account.balance - value
    })

    await accountRepository.update(userCredit.account.id, {
        balance: userCredit.account.balance + value
    })

    const transactionRepository = AppDataSource.getRepository(Transactions)

    const transaction = transactionRepository.create({
        debited: userDebit.account.id,
        credited: userCredit.account.id,
        value
    })

    await transactionRepository.save(transaction)

    return userDebit

}

export default createTransactionService