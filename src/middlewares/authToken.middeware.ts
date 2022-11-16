import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"

const authTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({
            message: 'Authorization is missing'
        })
    }


    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
        if (error) {
            return res.status(401).json(
                {
                    message: 'Invalid token'
                })
        }
        req.data = decoded.user
        return next()
    })
}

export default authTokenMiddleware