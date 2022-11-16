import { Router } from "express";
import createTransactionController from "../../controllers/transactions/createTransaction.controller";
import listTransactionsController from "../../controllers/transactions/listTransactions.controller";
import authTokenMiddleware from "../../middlewares/authToken.middeware";

const routes = Router()

const transactionsRoutes = () => {
    routes.post('/transaction', authTokenMiddleware, createTransactionController)
    routes.get('/transactions', authTokenMiddleware, listTransactionsController)
    return routes
}

export default transactionsRoutes