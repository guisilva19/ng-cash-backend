import { Request, Response } from "express"
import createTransactionService from "../../services/transactions/createTransaction.service"

const createTransactionController = async (req: Request, res: Response) => {
    const { value, username } = req.body
    const user = req.data
    const transaction = await createTransactionService({ value, username }, user)
    return res.json(transaction)
}

export default createTransactionController