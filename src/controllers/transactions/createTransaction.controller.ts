import { Request, Response } from "express"
import createTransactionService from "../../services/transactions/createTransaction.service"

const createTransactionController = async (req: Request, res: Response) => {
    const { value, username } = req.body
    const usernameCredit = req.data.username
    const transaction = await createTransactionService({ value, username }, usernameCredit)
    return res.json(transaction)
}

export default createTransactionController