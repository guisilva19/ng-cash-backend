import { NextFunction, Request, Response } from "express";

const verifySessionSerializer = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    
    try {
        const userSession = await schema.validate(data, {
            abortEarly: true,
            stripUnknown: true
        })
        req.userSession = userSession 
        return next()
    } catch (err) {
        return res.status(400).json({
            message: 'requires username and password'
        })
    }
}

export default verifySessionSerializer