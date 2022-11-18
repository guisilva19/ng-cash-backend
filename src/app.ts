const cors = require("cors");
import "reflect-metadata"
import "express-async-errors"
import express from "express";
import handleError from "./middlewares/handleError.middleware";
import AppRoutes from "./routes";

const app = express()

app.use(express.json())
AppRoutes(app)
app.use(cors)
app.use(handleError)



export { app }