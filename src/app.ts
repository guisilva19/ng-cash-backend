import "reflect-metadata"
import "express-async-errors"
import express from "express";
import handleError from "./middlewares/handleError.middleware";
import AppRoutes from "./routes";

const cors = require("cors");
const app = express()

app.use(cors())
app.use(express.json())
AppRoutes(app)
app.use(handleError)



export { app }