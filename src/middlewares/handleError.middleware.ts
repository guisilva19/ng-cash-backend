import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

const handleError = (err: AppError, req: Request, res: Response, next: NextFunction) => {

    const { statusCode, message } = err;

    if (err instanceof AppError) {
        return res.status(statusCode).json({
            message,
        });
    }
    console.log(err)
    return res.status(500).json(err);
}

export default handleError