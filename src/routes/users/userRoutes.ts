import { Router } from "express";
import { schemaRegister, schemaSession } from "../../schemas";
import createUserController from "../../controllers/users/createUser.controller";
import sessionUserController from "../../controllers/users/sessionUser.controller";
import verifyCreateUserSerializer from "../../serializers/verifyCreateUser.serializer";
import verifySessionSerializer from "../../serializers/verifySession.serializer";

const routes = Router()

const userRoutes = () => {
    routes.post('/register', verifyCreateUserSerializer(schemaRegister), createUserController)
    routes.post('/login', verifySessionSerializer(schemaSession), sessionUserController)
    return routes
}

export default userRoutes