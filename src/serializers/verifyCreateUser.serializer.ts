import { NextFunction, Request, Response } from "express"

const verifyCreateUserSerializer = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    const data = { username, password }

    try {
        const validatedBody = await schema.validate(data, {
            abortEarly: true,
            stripUnknown: true
        })
        req.user = validatedBody
        return next()
    } catch (err) {
        return res.status(400).json({
            message: 'The username minimum character is 3 and the password must contain a capital letter, a number and at least 8 characters'
        })
    }
}

export default verifyCreateUserSerializer