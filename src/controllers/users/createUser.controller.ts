import { Request, Response } from "express";
import { createUserService } from "../../services/users/createUser.service";
import { instanceToPlain } from 'class-transformer'


const createUserController = async (req: Request, res: Response) => {
    const { username, password } = req.user
    const createUser = await createUserService({username, password})

    return res.status(201).json(instanceToPlain(createUser))

}

export default createUserController