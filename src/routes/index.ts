import { Express } from "express"
import transactionsRoutes from "./transactions/transactionsRoutes"
import userRoutes from "./users/userRoutes"



const AppRoutes = (app: Express) => {
    app.use(userRoutes())
    app.use(transactionsRoutes())

}

export default AppRoutes