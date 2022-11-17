import AppDataSource from "../../data-source"
import { Accounts } from '../../entities/accounts';

const listTransactionsService = async (idAccount: string) => {


    const accountRepository = AppDataSource.getRepository(Accounts)

    const allAccounts: Array<any>= await accountRepository.find()

    const accountUser = allAccounts.find(account => account.id === idAccount)

    return accountUser


}

export default listTransactionsService