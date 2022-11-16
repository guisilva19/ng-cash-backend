
import * as express from "express"
import { IUser } from "../../interfaces"

declare global {
  namespace Express {
    interface Request {
      user: IUser,
      userSession: IUser
      data: any
    }
  }
}