import { Request, Response } from "express";
import sessionUserService from "../../services/users/sessionUser.service";

const sessionUserController = async (req: Request, res: Response) => {
    const { username, password } = req.userSession

    const token = await sessionUserService({username, password})

    return res.status(200).json({ token })
}

export default sessionUserController