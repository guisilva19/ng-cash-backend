import { Request, Response } from "express";
import userService from "../../services/users/user.service";

const userController = async (req: Request, res: Response) => {
    const { id } = req.data

    const user = await userService(id)

    return res.status(200).json(user)
}

export default userController