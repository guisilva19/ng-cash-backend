import { Request, Response } from "express"
import listTransactionsService from "../../services/transactions/listTrasnsaction.serivce"

const listTransactionsController  = async (req: Request, res: Response) => {

const accountId = req.data.account.id
const transactions = await listTransactionsService(accountId)

return res.json(transactions)
}

export default listTransactionsController